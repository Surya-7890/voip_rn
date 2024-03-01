import { Button, Text, View, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity, Platform, Image, NativeModules } from "react-native";
import GoogleIcon from "../public/google_logo.png";
import { useEffect } from "react";

let PlatformSpecificComponent = Platform.OS === 'android' ? TouchableNativeFeedback : Platform.OS === 'ios' ? TouchableHighlight : TouchableOpacity
const  { Test } = NativeModules;
export default function Login({ setAuth }) {

  useEffect(() => {
    Test.test("7002","7002","192.168.57.227", (name) => console.log(name))
  }, [])

  return (
    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ height: '35%', width: '80%', display: 'flex', justifyContent: 'space-evenly' }}>
        <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 30 }}>Login</Text>
        <PlatformSpecificComponent onPress={() => setAuth('auth')}>
          <View style={{ minWidth: '70%', minHeight: 40, borderRadius: 5, flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'center', gap: 10, alignSelf: 'center', backgroundColor: 'dodgerblue' }}>
            <Image source={GoogleIcon} style={{ height: 30, width: 30, borderRadius: 15 }} />
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Signin With Google</Text>
          </View>
        </PlatformSpecificComponent>
      </View>
      <View>
        <Text style={{ fontSize: 15, color: 'gray' }}>Only Use College Mail-Id To Login</Text>
      </View>
    </View>
  )
}