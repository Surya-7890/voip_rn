import { Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useRef } from "react";

export default function Contacts() {
  let ref = useRef();

  let timer;
  const handleChange = (e) => {
    clearTimeout(timer);
    console.log(e)
    if (e === '') return;
    timer = setTimeout(() => searchContacts(), 1000);
  }

  const searchContacts = async () => {
    try {
      console.log('hi')
    } catch (error) {
      
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    }
  }, [])


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled={true} style={{ height: '100%' }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={{ height: '30%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ height: 60, width: '85%', flexDirection: 'row', alignItems: 'center', borderColor: 'dodgerblue', borderWidth: 1.5, borderRadius: 10, paddingHorizontal: 10 }}>
              <TextInput 
                onChangeText={handleChange} 
                value={ref.current?.value} 
                ref={ref} 
                placeholder="Search Contact" 
                placeholderTextColor={'#000'}
                style={{ width: '90%', height: '100%', color: '#000' }} 
              />
              <Ionicons name="search" color={'dodgerblue'} size={30} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}