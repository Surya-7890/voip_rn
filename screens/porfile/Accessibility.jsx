import { useContext } from "react";
import { Text, View } from "react-native";
import { ApplicationContext } from "../../App";

export default function Accessibility() {
  const { themeColor } = useContext(ApplicationContext);
  return (
    <View style={{ height: '100%' }}>

    </View>
  )
}