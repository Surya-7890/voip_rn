import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";

export default function AppBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigation();
  Keyboard.addListener('keyboardDidShow', () => {
    setOpen(true)
  });
  Keyboard.addListener('keyboardDidHide', () => {
    setOpen(false);
  })
  return (
    <>
    {
      !open
      &&
      <View style={{ height: '8%', display: 'flex', flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 5 }}>
        <View style={{ height: '100%', width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Text style={{ fontWeight: '500', fontSize: 17 }}>VOIP</Text>
        </View>
        <View style={{ height: '100%', width: '60%', display: 'flex', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigate.navigate('profile')}  style={{ height: '90%', aspectRatio: '1/1', backgroundColor: 'gray', borderRadius: 99 }}>
            
          </TouchableOpacity>
        </View>
      </View>
    }
    </>
  )
}