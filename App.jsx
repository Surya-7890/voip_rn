import { PermissionsAndroid, StatusBar, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigators/auth";
import { useEffect, useState } from "react";
import HomePages from "./navigators/home";
import Login from "./screens/Login";
import { SafeAreaView } from "react-native-safe-area-context";
import { SipProvider } from "react-native-linphone-sdk";

export default function App() {
  const [auth, setAuth] = useState(null);

  return (
    <SipProvider>
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
    </SipProvider>
  )
}