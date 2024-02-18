import { Text, TouchableNativeFeedback, View, Platform, TouchableHighlight, TouchableOpacity, NativeAppEventEmitter } from "react-native";
import { useNavigation } from "@react-navigation/native";

console.log(Platform.OS);

let PlatformSpecificComponent = Platform.OS === 'android' ? TouchableNativeFeedback : Platform.OS === 'ios' ? TouchableHighlight : TouchableOpacity
let PlatformSpecificStyle = Platform.OS === 'android' ? { background: TouchableNativeFeedback.Ripple('lightgray') } : Platform.OS === 'ios' ? { underlayColor: 'lightgray' } : null; 

export default function ProfileLinks({ props, setMessage }) {

  const navigation = useNavigation();

  const handlePress = () => {
    if (props.onClick === 'new_tab') {
      return navigation.navigate(props.page);
    } else if (props.onClick === 'delete_account') {
      return setMessage({
        title: 'Delete Account',
        info: 'This Action Is Irreversible. Your Account Will be Permanently Deleted!'
      });
    } else if (props.onClick === 'signout') {
      return setMessage({
        title: 'Signout',
        info: 'You Will Be Signed Out Of This Account!'
      });
    }
  }

  return (
    <PlatformSpecificComponent onPress={handlePress} {...PlatformSpecificStyle}>
      <View style={{ height: 90, width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20, flexDirection: 'row', gap: 20 }}>
        <View>
          {props.icon}
        </View>
        <Text style={{ fontWeight: '600', color: '#000' }}>{props.name}</Text>
      </View>
    </PlatformSpecificComponent>
  )
}