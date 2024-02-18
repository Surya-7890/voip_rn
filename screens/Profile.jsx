import { Button, FlatList, Modal, Text, TouchableWithoutFeedback, View } from "react-native";
import { profileLinks } from "../utils";
import ProfileLinks from "../components/ProfileLinks";
import { useCallback, useState } from "react";

export default function Profile() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState({
    title: '',
    info: ''
  });
  const cachedFunction = useCallback(({item}) => <ProfileLinks props={item} setMessage={cachedModalHandlerFunction} />, []);

  const cachedModalHandlerFunction = useCallback((data) => {
    setVisible(true);
    setMessage(data);
  });

  const handleCancel = () => {
    setMessage({ title: '', info: '' })
    setVisible(false);
  }

  const handleContinue = () => {
    if (message.title === 'Delete Account') {
      console.log('account delete');
    } else if (message.title === 'Signout') {
      console.log('signout');
    }
    setMessage({ title: '', info: '' })
    setVisible(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: '30%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
        <View style={{ height: 150, aspectRatio: '1/1', backgroundColor: 'gray', borderRadius: 85 }}></View>
        <Text style={{ fontWeight: '600', color: '#222' }}>surya.m2021ecec@sece.ac.in</Text>
      </View>
      <View style={{ height: '70%', width: '100%' }}>
        <FlatList
          data={profileLinks}
          keyExtractor={(item) => item.name}
          renderItem={cachedFunction}
        />
      </View>
      {
        visible &&
        < Modal transparent style={{ position: 'absolute', top: 0, height: '100%', width: '100%' }}>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <View style={{ height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.40)', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ height: '35%', padding: 15, justifyContent: 'space-around', aspectRatio: '1/1', backgroundColor: 'white', borderRadius: 10 }}>
                <Text style={{ fontWeight: '700', fontSize: 20, textAlign: 'center', color: 'dodgerblue' }}>{message.title}</Text>
                <Text style={{ fontWeight: '500', fontSize: 17, textAlign: 'center', color: '#000' }}>{message.info}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                  <Button title="Cancel" color={'gray'} onPress={handleCancel} />
                  <Button title="Continue" onPress={handleContinue} />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      }
    </View>
  )
}