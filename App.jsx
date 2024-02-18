import { PermissionsAndroid, StatusBar, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigators/auth";
import { useEffect, useState } from "react";
import HomePages from "./navigators/home";
import Login from "./screens/Login";
import { SafeAreaView } from "react-native-safe-area-context";
import RNCallKeep from "react-native-callkeep";
import { mediaDevices } from "react-native-webrtc"

export default function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    RNCallKeep.setup({
      android: {
        selfManaged: true
      }
    }).then(d => console.log('hello: ', d)).catch(err => console.error(err));

  }, [])

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