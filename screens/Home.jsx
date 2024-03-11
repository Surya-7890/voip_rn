import { useContext, useEffect } from "react";
import { View, Text, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity, Platform, FlatList,NativeModules, NativeEventEmitter,PermissionsAndroid } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import VoipPushNotification from 'react-native-voip-push-notification';
import { requestNotifications, request, PERMISSIONS } from 'react-native-permissions';
import { ApplicationContext } from "../App";

// import {} from "react-native-webrtc";

import RNCallKeep from 'react-native-callkeep';


let PlatformSpecificComponent = Platform.OS === 'android' ? TouchableNativeFeedback : Platform.OS === 'ios' ? TouchableHighlight : TouchableOpacity;
let PlatformSpecificStyle = Platform.OS === 'android' ? { background: TouchableNativeFeedback.Ripple('gray', null, 30) } : { activeOpacity: 0.7 };

export default function Home() {
  const { mode, themeColor } = useContext(ApplicationContext);

  


  useEffect(() => {
    // const eventEmitter = new NativeEventEmitter(NativeModules.SDK);
    // let eventListener = eventEmitter.addListener('call', event => {
    //   // RNCallKeep.displayIncomingCall("7001", '101', '100', 'number', true);
    //   console.log(event.incoming) 
    // });
    console.log("request");

    const options = {
      ios: {
        appName: 'ReactNativeWazoDemo',
        imageName: 'sim_icon',
        supportsVideo: false,
        maximumCallGroups: '1',
        maximumCallsPerCallGroup: '1'
      },
      android: {
        alertTitle: 'Permissions Required',
        alertDescription:
          'This application needs to access your phone calling accounts to make calls',
        cancelButton: 'Cancel',
        okButton: 'ok',
        imageName: 'sim_icon',
        additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CONTACTS]
      }
    };

    try {
      RNCallKeep.setup(options);
      RNCallKeep.setAvailable(true); // Only used for Android, see doc above.
    } catch (err) {
      console.error('initializeCallKeep error:', err.message);
    }
    permiss()

    // RNCallKeep.setup(options);
    // console.log(RNCallKeep.checkIsInManagedCall());
    



    // permiss()
    // RNCallKeep.setup({
    //   android: {
    //     selfManaged: true
    //   }
    // }).then(d => console.log('hello: ', d)).catch(err => console.error("error: ",err));

    // RNCallKeep.addEventListener('didReceiveStartCallAction', onNativeCall);
    // RNCallKeep.addEventListener('answerCall', onAnswerCallAction);
    // RNCallKeep.addEventListener('endCall', onEndCallAction);
    // RNCallKeep.addEventListener('didDisplayIncomingCall', onIncomingCallDisplayed);
    // RNCallKeep.addEventListener('didPerformSetMutedCallAction', onToggleMute);
    // RNCallKeep.addEventListener('didPerformDTMFAction', onDTMF);

    // Removes the listener once unmounted
    // return () => {
    //   eventListener.remove();
    // };
  }, []);

  const onIncomingCallDisplayed = ({ callUUID, handle, fromPushKit }) => {
    // Incoming call displayed (used for pushkit on iOS)
  };

  const permiss=async()=>{
    console.log("requesting");
    try {
      await requestNotifications(['alert', 'sound']);
      if (Platform.OS === 'ios') {
        await request( PERMISSIONS.IOS.MICROPHONE);
        await request( PERMISSIONS.IOS.CAMERA);
        VoipPushNotification.requestPermissions();
        VoipPushNotification.addEventListener('register', async (token) => {
          apnsToken = token;
          console.log('setting apnsToken', apnsToken);
        });
      } else {
        await request(PERMISSIONS.ANDROID.READ_PHONE_STATE);
        await request(PERMISSIONS.ANDROID.CALL_PHONE);
        await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
        await request(PERMISSIONS.ANDROID.CAMERA);
      }

      RNCallKeep.setup({
        ios: {
          appName: 'voip_rn',
        },
        android: {
          alertTitle: 'Permissions required',
          alertDescription: 'This application needs to access your phone accounts',
          cancelButton: 'Cancel',
          okButton: 'ok',
        }
      });

      // RNCallKeep.setAvailable(true);

      console.log("requested");
    } catch (err) {
      console.warn('Error requesting permission:', err);
    }
  }






  

  return (
    <View style={{ flex: 1, backgroundColor: mode === 'light' ? 'white' : '#333' }}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          keyExtractor={(item) => item}
          renderItem={() => (
            <View style={{ height: 90, width: '100%', paddingLeft: 15, paddingRight: 10, flexDirection: 'row', marginVertical: 10 }}>


              <View style={{ height: '100%', gap: 20, width: '80%', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 60, aspectRatio: '1/1', borderRadius: 30, backgroundColor: 'black' }}></View>
                <View>
                  <Text style={{ fontSize: 18, color: mode === 'light' ? themeColor : 'white' }}>Name</Text>
                </View>
              </View>


              <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                <PlatformSpecificComponent onPress={() => {}} {...PlatformSpecificStyle} >
                  <View style={{ height: 80, width: 80, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name="call" size={25} color={mode === 'light' ? themeColor : 'white'} />
                  </View>
                </PlatformSpecificComponent>
              </View>


            </View>
          )}
        />
    </View>
  )
}