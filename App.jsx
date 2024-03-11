import { PermissionsAndroid, StatusBar, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigators/auth";
import { createContext, useEffect, useState } from "react";
import HomePages from "./navigators/home";
import Login from "./screens/Login";
import { SafeAreaView } from "react-native-safe-area-context";

export const ApplicationContext = createContext({});

export default function App() {
  const [auth, setAuth] = useState(null);
  const [themeColor, setThemeColor] = useState('blue');
  const [mode, setMode] = useState('light')
  return (
    <NavigationContainer>
      <ApplicationContext.Provider value={{ themeColor, setThemeColor, mode, setMode }}>
      {
        auth 
        ?
        <HomePages/>
        :
        <SafeAreaView style={{ flex: 1 }}>
          <Login setAuth={setAuth} />
        </SafeAreaView>
      }
      </ApplicationContext.Provider>
    </NavigationContainer>
  )
}