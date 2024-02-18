import { View, Text, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity, Platform, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import {} from "react-native-webrtc";

let PlatformSpecificComponent = Platform.OS === 'android' ? TouchableNativeFeedback : Platform.OS === 'ios' ? TouchableHighlight : TouchableOpacity;
let PlatformSpecificStyle = Platform.OS === 'android' ? { background: TouchableNativeFeedback.Ripple('gray', null, 30) } : { activeOpacity: 0.7 };

export default function Home() {

  return (
    <View style={{ flex: 1 }}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          keyExtractor={(item) => item}
          renderItem={() => (
            <View style={{ height: 90, width: '100%', paddingLeft: 15, paddingRight: 10, flexDirection: 'row', marginVertical: 10 }}>


              <View style={{ height: '100%', gap: 20, width: '80%', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 60, aspectRatio: '1/1', borderRadius: 30, backgroundColor: 'black' }}></View>
                <View>
                  <Text style={{ fontSize: 18, color: '#000' }}>Name</Text>
                </View>
              </View>


              <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                <PlatformSpecificComponent onPress={() => {}} {...PlatformSpecificStyle} >
                  <View style={{ height: 80, width: 80, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name="call" size={25} color="#000" />
                  </View>
                </PlatformSpecificComponent>
              </View>


            </View>
          )}
        />
    </View>
  )
}