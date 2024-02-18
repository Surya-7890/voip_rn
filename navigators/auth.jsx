import { createMaterialTopTabNavigator  } from "@react-navigation/material-top-tabs";
import Home from "../screens/Home";
import Contacts from "../screens/Contacts";
import History from "../screens/History";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome6";
import AppBar from "../components/AppBar";
import { Keyboard } from "react-native";

const Tab = createMaterialTopTabNavigator();

const iconSize = 25;

export default function Tabs() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppBar />
      <Tab.Navigator initialRouteName="home" screenOptions={{ tabBarStyle: { height: '8%', display: 'flex', justifyContent: 'center' } }}>
        <Tab.Screen name="home" component={Home} options={{
          tabBarShowIcon: true,
          tabBarIcon: ({ focused, color }) => (
            <Icon name="house" size={iconSize} color={focused ? 'dodgerblue' : 'gray'}  />
          ),
          tabBarAndroidRipple: {
            color: 'lightgray',
            borderless: true,
            foreground: false
          },
          tabBarShowLabel: false,
          tabBarIconStyle: {
            padding: 0,
            height: '100%', 
            width: '100%'
          }
        }} />
        <Tab.Screen name="history" component={History} options={{
          tabBarShowIcon: true,
          tabBarIcon: ({ focused, color }) => (
            <Icon name="clock" size={iconSize} color={focused ? 'dodgerblue' : 'gray'}  />
          ),
          tabBarShowLabel: false,
          tabBarAndroidRipple: {
            color: 'lightgray',
            borderless: true
          },
          tabBarIconStyle: {
            padding: 0,
            height: '100%', 
            width: '100%'
          }
        }} />
        <Tab.Screen name="contacts" component={Contacts} options={{
          tabBarShowIcon: true,
          tabBarIcon: ({ focused, color }) => (
            <Icon name="user-plus" size={iconSize} color={focused ? 'dodgerblue' : 'gray'}  />
          ),
          tabBarShowLabel: false,
          tabBarAndroidRipple: {
            color: 'lightgray',
            borderless: true
          },
          tabBarIconStyle: {
            padding: 0,
            height: '100%', 
            width: '100%'
          }
        }} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}