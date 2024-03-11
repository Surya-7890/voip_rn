import {
  Button,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  Image,
  NativeModules,
  TextInput,
  NativeEventEmitter,
  PermissionsAndroid,
} from 'react-native';
import GoogleIcon from '../public/google_logo.png';
import {useContext, useEffect, useRef, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ApplicationContext} from '../App';
import {requestNotifications} from 'react-native-permissions';
import RNCallKeep from 'react-native-callkeep';

let PlatformSpecificComponent =
  Platform.OS === 'android'
    ? TouchableNativeFeedback
    : Platform.OS === 'ios'
    ? TouchableHighlight
    : TouchableOpacity;
const {SDK} = NativeModules;
export default function Login({setAuth}) {
  const username = useRef(null);
  const password = useRef(null);
  const {themeColor, mode} = useContext(ApplicationContext);

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.SDK);
    let eventListener = eventEmitter.addListener('login', event => {
      console.log(event.status); // "someValue"
      if (event.status === 'Ok') {
        // setAuth('auth');
      }
    });

    let eventListener2 = eventEmitter.addListener('call', event => {
      console.log("incoming call : ",event.incoming); // "someValue"
      RNCallKeep.displayIncomingCall("1234", "123", "123", 'number', true);
    });


    requestPhonePermission();

    // Removes the listener once unmounted
    return () => {
      eventListener.remove();
    };
  }, []);

  async function requestPhonePermission() {
    console.log('requesting');
    try {
      console.log(await RNCallKeep.setup({
        ios: {
          appName: 'voip_rn',
        },
        android: {
          alertTitle: 'Permissions required',
          alertDescription:
            'This application needs to access your phone accounts',
          cancelButton: 'Cancel',
          okButton: 'ok',
        },
      }));
      RNCallKeep.setAvailable(true);

      const options = {
        alertTitle: 'Default not set',
        alertDescription: 'Please set the default phone account'
      };
      console.log("Account status ",RNCallKeep.registerPhoneAccount(options) )
      console.log("Account: ",await RNCallKeep.checkPhoneAccountEnabled());
    } catch (err) {
      console.error('initializeCallKeep error:', err.message);
    }

    RNCallKeep.addEventListener('didReceiveStartCallAction', onNativeCall);
    RNCallKeep.addEventListener('answerCall', onAnswerCallAction);
    RNCallKeep.addEventListener('endCall', onEndCallAction);
    RNCallKeep.addEventListener(
      'didDisplayIncomingCall',
      onIncomingCallDisplayed,
    );
    RNCallKeep.addEventListener('didPerformSetMutedCallAction', onToggleMute);
    RNCallKeep.addEventListener('didPerformDTMFAction', onDTMF);
  }

  const onNativeCall = ({handle}) => {
    // _onOutGoingCall on android is also called when making a call from the app
    // so we have to check in order to not making 2 calls
    // if (inCall) {
    //   return;
    // }
    // // Called when performing call from native Contact app
    // call(handle);
  };

  const onAnswerCallAction = ({callUUID}) => {
    // called when the user answer the incoming call
    // answer(true);
    // RNCallKeep.setCurrentCallActive(callUUID);
    // // On Android display the app when answering a video call
    // if (!isIOS && currentSession.cameraEnabled) {
    //   RNCallKeep.backToForeground();
    // }
  };

  const onEndCallAction = ({callUUID}) => {
    hangup();
  };

  const onIncomingCallDisplayed = ({callUUID, handle, fromPushKit}) => {
    // Incoming call displayed (used for pushkit on iOS)
  };

  const onToggleMute = muted => {
    // Called when the system or the user mutes a call
    // Wazo.Phone[muted ? 'mute' : 'unmute'](currentSession);
  };

  const onDTMF = action => {
    console.log('onDTMF', action);
  };

  const login = async() => {
    // setAuth('1234')
    // console.log("displaying");
    // RNCallKeep.setCurrentCallActive();
    //  RNCallKeep.startCall("555", "123", "888", 'number',hasVideo=false)
    SDK.login(
      username.current.value,
      password.current.value,
      '192.168.177.227',
      name => {
        console.log(name);
      },
    );
  };

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mode === 'light' ? 'white' : '#333',
      }}>
      <View
        style={{
          height: '35%',
          width: '80%',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 30,
            color: themeColor,
          }}>
          Login
        </Text>
        <View style={{width: '65%'}}>
          <TextInput
            style={{
              borderBottomColor: mode === 'light' ? 'black' : 'white',
              borderBottomWidth: 2,
              fontSize: 19,
              paddingLeft: 10,
              color: themeColor,
            }}
            placeholder="Username"
            placeholderTextColor={mode === 'light' ? 'black' : 'white'}
            onChangeText={e => (username.current.value = e)}
            onFocus={() =>
              username.current.setNativeProps({borderBottomColor: themeColor})
            }
            onBlur={() =>
              username.current.setNativeProps({
                borderBottomColor: mode === 'light' ? 'black' : 'white',
              })
            }
            ref={username}
          />
          <TextInput
            style={{
              borderBottomColor: mode === 'light' ? 'black' : 'white',
              borderBottomWidth: 2,
              fontSize: 19,
              paddingLeft: 10,
              color: themeColor,
            }}
            placeholder="Password"
            placeholderTextColor={mode === 'light' ? 'black' : 'white'}
            onChangeText={e => (password.current.value = e)}
            onFocus={() =>
              password.current.setNativeProps({borderBottomColor: themeColor})
            }
            onBlur={() =>
              password.current.setNativeProps({
                borderBottomColor: mode === 'light' ? 'black' : 'white',
              })
            }
            ref={password}
          />
        </View>
        <PlatformSpecificComponent onPress={() => login()}>
          <View
            style={{
              minWidth: '55%',
              minHeight: 40,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              justifyContent: 'center',
              gap: 10,
              alignSelf: 'center',
              backgroundColor: themeColor,
            }}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
              Login
            </Text>
            <MaterialIcons name="login" size={25} />
          </View>
        </PlatformSpecificComponent>
      </View>
      <View>
        <Text style={{fontSize: 15, color: 'gray'}}>
          Only Use College Mail-Id To Login
        </Text>
      </View>
    </View>
  );
}
