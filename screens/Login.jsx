import { Button, Text, View, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity, Platform, Image, NativeModules, TextInput } from "react-native";
import GoogleIcon from "../public/google_logo.png";
import { useEffect, useRef, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

let PlatformSpecificComponent = Platform.OS === 'android' ? TouchableNativeFeedback : Platform.OS === 'ios' ? TouchableHighlight : TouchableOpacity
const  { SDK } = NativeModules;
export default function Login({ setAuth }) {
  const username = useRef(null);
  const password = useRef(null);
  
  const login = () => {
    try{
      SDK.login(username.current.value,password.current.value,"192.168.57.227", (name) => console.log(name));

    }catch(err){
      console.log(err);
    }
  }


  return (
    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ height: '35%', width: '80%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 30 }}>Login</Text>
        <View style={{ width: '65%' }}>
          <TextInput 
            style={{ borderBottomColor: 'white', borderBottomWidth: 2, fontSize: 19, paddingLeft: 10 }} 
            placeholder="Username"
            onChangeText={(e) => username.current.value = e}
            onFocus={() => username.current.setNativeProps({ borderBottomColor: 'dodgerblue' })}
            onBlur={() => username.current.setNativeProps({ borderBottomColor: 'white' })}
            ref={username}
          />
          <TextInput 
            style={{ borderBottomColor: 'white', borderBottomWidth: 2, fontSize: 19, paddingLeft: 10 }} 
            placeholder="Password"
            onChangeText={(e) => password.current.value = e}
            onFocus={() => password.current.setNativeProps({ borderBottomColor: 'dodgerblue' })}
            onBlur={() => password.current.setNativeProps({ borderBottomColor: 'white' })}
            ref={password}
          />
        </View>
        <PlatformSpecificComponent onPress={() => login()}>
          <View style={{ minWidth: '55%', minHeight: 40, borderRadius: 5, flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'center', gap: 10, alignSelf: 'center', backgroundColor: 'dodgerblue' }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Login</Text>
            <MaterialIcons name="login" size={25} />
          </View>
        </PlatformSpecificComponent>
      </View>
      <View>
        <Text style={{ fontSize: 15, color: 'gray' }}>Only Use College Mail-Id To Login</Text>
      </View>
    </View>
  )
}