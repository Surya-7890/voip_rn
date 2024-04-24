import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import Tabs from "./auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, Text, View } from "react-native";
import Accessibility from "../screens/porfile/Accessibility";
import BlockList from "../screens/porfile/BlockList";
import DeleteAccount from "../screens/porfile/DeleteAccount";
import Notification from "../screens/porfile/Notification";
import Signout from "../screens/porfile/Signout";
import { useEffect } from "react";
import { useSIPClient } from "react-native-linphone-sdk"

const HomeStack = createNativeStackNavigator();

export default function HomePages() {

  useEffect(() => {
    
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeStack.Navigator initialRouteName="index" screenOptions={{
        headerShown: false
      }}>
        <HomeStack.Screen name="index" component={Tabs} />
        <HomeStack.Screen name="profile" component={Profile} options={{
          animation: 'simple_push',
          headerShown: true,
          headerTitle: 'Profile'
        }} />
        <HomeStack.Screen name="accessibility" component={Accessibility} />
        <HomeStack.Screen name="block_list" component={BlockList} />
        <HomeStack.Screen name="delete_account" component={DeleteAccount} />
        <HomeStack.Screen name="notification" component={Notification} />
        <HomeStack.Screen name="signout" component={Signout} />
      </HomeStack.Navigator>
      <StatusBar barStyle={"light-content"} />
      </SafeAreaView>
  )
}