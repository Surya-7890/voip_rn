import { Button, Text, View, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity, Platform, Image } from "react-native";
import GoogleIcon from "../public/google_logo.png";
import React, { useState, useEffect } from 'react';
import { requestNotifications, request, PERMISSIONS } from 'react-native-permissions';
import Wazo from '@wazo/sdk/lib/simple';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VoipPushNotification from "react-native-voip-push-notification";
import getApiClient from "@wazo/sdk/lib/service/getApiClient";

let PlatformSpecificComponent = Platform.OS === 'android' ? TouchableNativeFeedback : Platform.OS === 'ios' ? TouchableHighlight : TouchableOpacity

export default function Login({ setAuth }) {

  const handleLogin = async () => {
    try {
      Wazo.Auth.init();
      Wazo.Auth.setHost('http://172.16.123.148:5083');
      const session = await Wazo.Auth.logIn('test1', '12345');
      console.log(session);
      setAuth('auth')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ height: '35%', width: '80%', display: 'flex', justifyContent: 'space-evenly' }}>
        <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 30 }}>Login</Text>
        <PlatformSpecificComponent onPress={handleLogin}>
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