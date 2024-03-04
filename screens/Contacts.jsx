import { Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, FlatList, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ApplicationContext } from "../App";

const data = [
  { label: 'ECE', value: 'ECE' },
  { label: 'EEE', value: 'EEE' },
  { label: 'CCE', value: 'CCE' },
  { label: 'AIDS', value: 'AIDS' },
  { label: 'AIML', value: 'AIML' },
  { label: 'ME', value: 'ME' },
  { label: 'CSBS', value: 'CSBS' },
  { label: 'CSE', value: 'CSE' }
];

export default function Contacts() {
  let ref = useRef();
  const [value, setValue] = useState('')
  const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const { themeColor } = useContext(ApplicationContext);

  const searchByDepartment = useCallback(async() => {
    // fetch request to the server to get the first n members of the selected department
    // initially the data will be arbitrary, the first n members will be selected regardless of their department
    // updates the list array
  }, [value]);

  let timer;
  const handleChange = (e) => {
    clearTimeout(timer);
    if (e === '') return;
    timer = setTimeout(() => searchContacts(e), 1000);
  }

  const searchContacts = async (name) => {
    try {
      console.log(name)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    searchByDepartment();
    return () => {
      clearTimeout(timer);
    }
  }, [])


  return (
    <View style={{ height: '100%' }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>

          <View style={{ height: '20%', width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Department"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
              renderLeftIcon={() => (
                <MaterialIcons style={styles.icon} color={themeColor} name="filter-alt" size={25} />
              )}
              renderItem={({ label, value }) => (
                <View style={{ height: 50, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, flexDirection: 'row' }}>
                  <Text style={{ color: 'gray', fontSize: 16, fontWeight: 700 }}>{label}</Text>
                  <MaterialIcons name="chevron-right" size={25} color={themeColor} />
                </View>
              )}
            />

            <View style={{ height: 60, width: '85%', flexDirection: 'row', alignItems: 'center', borderColor: themeColor, borderWidth: 1.5, borderRadius: 10, paddingHorizontal: 10 }}>
              <TextInput 
                onChangeText={handleChange} 
                value={ref.current?.value} 
                ref={ref} 
                placeholder="Search Contact" 
                placeholderTextColor={'#000'}
                style={{ width: '90%', height: '100%', color: '#000' }} 
              />
              <Ionicons name="search" color={themeColor} size={30} />
            </View>
          </View>

            <FlatList 
              data={list}
              style={{ paddingHorizontal: 5 }}
              keyExtractor={(item) => item}
              bounces={false}
              renderItem={({ item }) => (
                <View style={{ width: '100%', height: 110, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ height: '95%', width: '100%', backgroundColor: '#eee', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ color: themeColor, fontSize: 18, fontWeight: '700' }}>{item}</Text>
                    <MaterialIcons name="chevron-right" size={25} color={themeColor} />
                  </View>
                </View>
              )}
            />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: '70%',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    color: 'black' 
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 17,
    color: 'black'
  },
  selectedTextStyle: {
    fontSize: 17,
    color: 'black'
  },
});