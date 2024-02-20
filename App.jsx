import {StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigators/auth";
import React, { useReducer, useEffect, useState } from 'react';
import HomePages from "./navigators/home";
import Login from "./screens/Login";
import { SafeAreaView } from "react-native-safe-area-context";
import RNCallKeep from "react-native-callkeep";
import { RTCPeerConnection, RTCSessionDescription, MediaStream, mediaDevices, RTCView } from "react-native-webrtc";
import Wazo from '@wazo/sdk/lib/simple';
import { requestNotifications, request, PERMISSIONS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VoipPushNotification from "react-native-voip-push-notification";
import getApiClient from "@wazo/sdk/lib/service/getApiClient";


global.MediaStream = MediaStream;
global.RTCSessionDescription = RTCSessionDescription;
global.RTCPeerConnection = RTCPeerConnection;
global.navigator.mediaDevices = {
  ...global.navigator.mediaDevices,
  getUserMedia: mediaDevices.getUserMedia,
};


const isIOS = Platform.OS === 'ios';
let currentSession;
const reducer = (state, action) => ({ ...state, ...action});
const initialState = {
  ready: false,
  number: '',
  ringing: false,
  inCall: false,
  held: false,
  videoHeld: false,
  error: null,
  localStreamURL: null,
  remoteStreamURL: null,
};

const defaultUsername = '';
const defaultServer = 'http://localhost:zy';



export default function App() {
  const [auth, setAuth] = useState(null);

  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { number, ringing, inCall, held, localStreamURL, remoteStreamURL, ready, videoHeld } = state;
  let currentCallId;
  let localStream;
  let remoteStream;

  const getCurrentCallId = () => {
    if (!currentCallId) {
      currentCallId = ramdomUuid().toLowerCase();
    }

    return currentCallId;
  };

  const init = async () => {
    await initializeWebRtc();
    await initializeCallKeep();
    displayLocalVideo();

    dispatch({ ready: true });
  };

  const initializeWebRtc = async () => {
    await Wazo.Phone.connect({ audio: true, video: true });

    Wazo.Phone.on(Wazo.Phone.ON_CALL_INCOMING, callSession => {
      setupCallSession(callSession);
      currentSession = callSession;
      dispatch({ ringing: true });

      // Tell callkeep that we a call is incoming for audio calls
      const { number } = callSession;
      RNCallKeep.displayIncomingCall(getCurrentCallId(), number, number, 'number', true);
    });
  };

  const initializeCallKeep = async () => {
    try {
      RNCallKeep.setup({
      ios: {
        appName: 'WazoReactNativeDemo',
      },
      android: {
        alertTitle: 'Permissions required',
        alertDescription: 'This application needs to access your phone accounts',
        cancelButton: 'Cancel',
        okButton: 'ok',
      }
    });
      RNCallKeep.setAvailable(true);
    } catch (err) {
      console.error('initializeCallKeep error:', err.message);
    }

    // Add RNCallKit Events
    RNCallKeep.addEventListener('didReceiveStartCallAction', onNativeCall);
    RNCallKeep.addEventListener('answerCall', onAnswerCallAction);
    RNCallKeep.addEventListener('endCall', onEndCallAction);
    RNCallKeep.addEventListener('didDisplayIncomingCall', onIncomingCallDisplayed);
    RNCallKeep.addEventListener('didPerformSetMutedCallAction', onToggleMute);
    RNCallKeep.addEventListener('didPerformDTMFAction', onDTMF);
  };

  const getLocalStream = () => mediaDevices.getUserMedia({
    audio: true,
    video: {
      mandatory: {
        minWidth: 500,
        minHeight: 300,
        minFrameRate: 30
      },
      facingMode: 'user',
    }
  });

  const displayLocalVideo = () => {
    getLocalStream().then((stream) => {
      dispatch({ localStreamURL: stream.toURL() });
    });
  };

  const setupCallSession = callSession => {
    currentSession = callSession;

    Wazo.Phone.on(Wazo.Phone.ON_CALL_FAILED, (response, cause) => {
      dispatch({ error: cause, ringing: false, inCall: false });
    });

    Wazo.Phone.on(Wazo.Phone.ON_CALL_ENDED, () => {
      onCallTerminated();
    });

    Wazo.Phone.on(Wazo.Phone.ON_CALL_ACCEPTED, () => {
      const session = Wazo.Phone.getCurrentSipSession();
      // Setup local stream
      if (callSession.cameraEnabled) {
        const { peerConnection } = session.sessionDescriptionHandler;
        localStream = peerConnection.getLocalStreams().find(stream => !!stream.getVideoTracks().length);
        remoteStream = peerConnection.getRemoteStreams().find(stream => !!stream.getVideoTracks().length);

        dispatch({
          localStreamURL: localStream ? localStream.toURL() : null,
          remoteStreamURL: remoteStream ? remoteStream.toURL() : null,
        });

        // On Android display the app when answering a video call
        if (!isIOS) {
          RNCallKeep.backToForeground();
        }
      }
    });
  };

  const call = async (number, video = false) => {
    const session = await Wazo.Phone.call(number, video);
    setupCallSession(session);

    dispatch({ inCall: true, ringing: false });

    RNCallKeep.startCall(getCurrentCallId(), number, number, 'number', video);
  };

  const answer = withVideo => {
    dispatch({ inCall: true, ringing: false });
    RNCallKeep.setCurrentCallActive();

    Wazo.Phone.accept(currentSession, withVideo);
  };

  const hangup = async () => {
    const currentCallId = getCurrentCallId();
    if (!currentSession || !currentCallId) {
      return;
    }

    try {
      await Wazo.Phone.hangup(currentSession);
    } catch (e) {
      // Nothing to do
    }

    onCallTerminated();
  };

  const onCallTerminated = () => {
    if (currentCallId) {
      RNCallKeep.endCall(currentCallId);
    }
    dispatch({
      inCall: false,
      ringing: false,
      currentCallId: null,
      remoteStreamURL: null,
      localStreamURL: null,
    });

    if (remoteStream) {
      remoteStream.release();
      remoteStream = null;
    }
    if (localStream) {
      localStream.release();
      localStream = null;
    }

    currentCallId = null;
    currentSession = null;

    displayLocalVideo();
  };

  const onAnswerCallAction = ({ callUUID }) => {
    // called when the user answer the incoming call
    answer(true);

    RNCallKeep.setCurrentCallActive(callUUID);

    // On Android display the app when answering a video call
    if (!isIOS && currentSession.cameraEnabled) {
      RNCallKeep.backToForeground();
    }
  };

  const onIncomingCallDisplayed = ({ callUUID, handle, fromPushKit }) => {
    // Incoming call displayed (used for pushkit on iOS)
  };

  const onNativeCall = ({ handle }) => {
    // _onOutGoingCall on android is also called when making a call from the app
    // so we have to check in order to not making 2 calls
    if (inCall) {
      return;
    }
    // Called when performing call from native Contact app
    call(handle);
  };

  const toggleHold = () => {
    Wazo.Phone[held ? 'unhold' : 'hold'](currentSession);
    dispatch({ held: !held });
  };

  const toggleVideoHold = () => {
    Wazo.Phone[videoHeld ? 'turnCameraOn' : 'turnCameraOff'](currentSession);
    dispatch({ videoHeld: !videoHeld });
  };

  const onEndCallAction = ({ callUUID }) => {
    hangup();
  };

  const onToggleMute = (muted) => {
    // Called when the system or the user mutes a call
    Wazo.Phone[muted ? 'mute' : 'unmute'](currentSession);
  };

  const onDTMF = (action) => {
    console.log('onDTMF', action);
  };

  const logout = async () => {
    if (currentSession) {
      await hangup();
    }
    Wazo.Auth.logout();
    await AsyncStorage.removeItem('token');

    onLogout();
  };

  useEffect(() => {
    // init();
  }, []);

  const isVideo = currentSession && currentSession.cameraEnabled;

  return (
    <NavigationContainer>
      {
        auth 
        ?
        <HomePages/>
        :
        <SafeAreaView style={{ flex: 1 }}>
          <Login setAuth={setAuth} />
        </SafeAreaView>
      }
    </NavigationContainer>
  )
}