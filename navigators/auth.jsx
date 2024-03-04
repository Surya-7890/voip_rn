import { createMaterialBottomTabNavigator  } from "react-native-paper/react-navigation";
import Home from "../screens/Home";
import Contacts from "../screens/Contacts";
import History from "../screens/History";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome6";
import AppBar from "../components/AppBar";
import { useContext } from "react";
import { ApplicationContext } from "../App";

const Tab = createMaterialBottomTabNavigator();

const iconSize = 25;

export default function Tabs() {
  const { themeColor, mode } = useContext(ApplicationContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mode === 'light' ? 'white' : '#333' }}>
      <AppBar />
      <Tab.Navigator initialRouteName="home" barStyle={{ backgroundColor: mode === 'light' ? 'white' : '#333', borderTopWidth: 1, borderTopColor: mode === 'light' ? themeColor : 'white' }} screenOptions={{ tabBarStyle: { height: '8%', display: 'flex', justifyContent: 'center',  backgroundColor: mode === 'light' ? 'white' : '#333' } }}>
        <Tab.Screen name="home" component={Home} options={{
          tabBarShowIcon: true,
          tabBarIcon: ({ focused, color }) => (
            <Icon name="house" size={iconSize} color={focused ? themeColor : mode === 'light' ? themeColor : 'white'}  />
          ),
          tabBarAndroidRipple: {
            color: themeColor,
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
            <Icon name="clock" size={iconSize} color={focused ? themeColor : mode === 'light' ? themeColor : 'white'}  />
          ),
          tabBarShowLabel: false,
          tabBarAndroidRipple: {
            color: themeColor,
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
            <Icon name="user-plus" size={iconSize} color={focused ? themeColor : mode === 'light' ? themeColor : 'white'}  />
          ),
          tabBarShowLabel: false,
          tabBarAndroidRipple: {
            color: themeColor,
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