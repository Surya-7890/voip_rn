import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

const iconSize = 30

export const profileLinks = [
  {
    name: 'Accessibility',
    page: 'accessibility',
    icon: <Ionicons name="accessibility" size={iconSize} color="#000" />,
    onClick: 'new_tab'
  },
  {
    name: 'Block List',
    page: 'block_list',
    icon: <Entypo name="block" size={iconSize} color="#000" />,
    onClick: 'new_tab'
  },
  {
    name: 'Notifications',
    page: 'notification',
    icon:  <Entypo name="notification" size={iconSize} color="#000" />,
    onClick: 'new_tab'
  },
  {
    name: 'Delete Account',
    page: 'delete_account',
    icon: <MaterialIcons name="delete" size={iconSize} color="#000" />,
    onClick: 'delete_account'
  },
  {
    name: 'Signout',
    page: 'signout',
    icon: <AntDesign name="logout" size={iconSize} color="#000" />,
    onClick: 'signout'
  }
]