import {StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigators/auth";
import React, { useReducer, useEffect, useState } from 'react';
import HomePages from "./navigators/home";
import Login from "./screens/Login";
import { SafeAreaView } from "react-native-safe-area-context";
import RNCallKeep from "react-native-callkeep";
import { RTCPeerConnection, RTCSessionDescription, MediaStream, mediaDevices, RTCView } from "react-native-webrtc";
import { requestNotifications, request, PERMISSIONS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VoipPushNotification from "react-native-voip-push-notification";


global.MediaStream = MediaStream;
global.RTCSessionDescription = RTCSessionDescription;
global.RTCPeerConnection = RTCPeerConnection;
global.navigator.mediaDevices = {
  ...global.navigator.mediaDevices,
  getUserMedia: mediaDevices.getUserMedia,
};


export default function App() {
  const [auth, setAuth] = useState(null);

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