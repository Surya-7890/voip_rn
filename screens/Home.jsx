import {useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  FlatList,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
const {SDK} = NativeModules;

import Ionicons from 'react-native-vector-icons/Ionicons';
import {ApplicationContext} from '../App';
import RNCallKeep from 'react-native-callkeep';

let PlatformSpecificComponent =
  Platform.OS === 'android'
    ? TouchableNativeFeedback
    : Platform.OS === 'ios'
    ? TouchableHighlight
    : TouchableOpacity;

let PlatformSpecificStyle =
  Platform.OS === 'android'
    ? {background: TouchableNativeFeedback.Ripple('gray', null, 30)}
    : {activeOpacity: 0.7};

export default function Home() {
  const {mode, themeColor} = useContext(ApplicationContext);

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.SDK);

    RNCallKeep.addEventListener('answerCall', this.onAnswerCallAction);
    RNCallKeep.addEventListener('endCall', this.onEndCallAction);

    let incomingcall = eventEmitter.addListener('incoming', event => {
      RNCallKeep.displayIncomingCall(
        '1234',
        event.id.toString(),
        event.id.toString(),
        'number',
        true,
      );
      console.log('incoming ', event.id);
    });

    let callStatus = eventEmitter.addListener('call_status', event => {
      if (event.reject === 'rejected') {
        console.log('account', event.account);
        RNCallKeep.endCall('1234');
      }
    });
    RNCallKeep.setAvailable(true);

    console.log('request');
    return () => {
      incomingcall.remove();
      callStatus.remove();
    };
  }, []);

  onAnswerCallAction = data => {
    let {callUUID} = data;
    SDK.attend(name => {
      console.log(name);
    });
  };

  onEndCallAction = data => {
    let {callUUID} = data;
    console.log('UUID ', callUUID);
    RNCallKeep.endCall(callUUID);
    SDK.end(name => {
      console.log(name);
    });
  };

  return (
    <View
      style={{flex: 1, backgroundColor: mode === 'light' ? 'white' : '#333'}}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={item => item}
        renderItem={() => (
          <View
            style={{
              height: 90,
              width: '100%',
              paddingLeft: 15,
              paddingRight: 10,
              flexDirection: 'row',
              marginVertical: 10,
            }}>
            <View
              style={{
                height: '100%',
                gap: 20,
                width: '80%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 60,
                  aspectRatio: '1/1',
                  borderRadius: 30,
                  backgroundColor: 'black',
                }}></View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    color: mode === 'light' ? themeColor : 'white',
                  }}>
                  Name
                </Text>
              </View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '20%',
              }}>
              <PlatformSpecificComponent
                onPress={() => {}}
                {...PlatformSpecificStyle}>
                <View
                  style={{
                    height: 80,
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name="call"
                    size={25}
                    color={mode === 'light' ? themeColor : 'white'}
                  />
                </View>
              </PlatformSpecificComponent>
            </View>
          </View>
        )}
      />
    </View>
  );
}
