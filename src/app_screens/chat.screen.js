import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { Text, View, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import * as firebase from 'firebase'

//Local imports
import { SafeArea } from '../app_utils/safe-area.component'
import { chatDetails } from '../app_services/firebase.services/firebase.service.alert'
import { ChatScreen } from '../app_components/chat.screen.component'
import { Spacer } from '../app_infrastructure/spacer/spacer.component'


export const Chat = () => {
  const userRefs = firebase.firestore().collection('Users');
  const [uidList, setList] = useState(null);
  const [userChat, setUserChat] = useState(null);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState(null);

  // const [detailsInfo, setDetailInfo] = useState(null)
  // const [name, setName] = useState(null);
  // const [kin, setKin] = useState(null);

  // const details = (info) => {
  //   setDetailInfo(info)
  //    setName(info[0])
  //    setEmail(info[1])
  //    setKin(info[2])
  // }

  useEffect(() => {
    const uids = [];
    const email = [];
    userRefs.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        uids.push(doc.data().uid)
      })
    }); setList(uids)
    userRefs.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        email.push(doc.data().email)
      })
    }); setEmail(email)
  }, [])


  return (
    <SafeArea>
      <View style={styles.containerMain}>
        {show ? (<ChatScreen uid={userChat} setShow={setShow} />)
          : (<>
            <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: 10, color: 'green', textAlign: 'center' }}>Select a users to chat</Text>
            <FlatList
              data={uidList}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setUserChat(item)
                      setShow(true)
                    }}
                  >
                    <View style={styles.container}>
                      <Text style={styles.list}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }
              }
              contentContainerStyle={{
                flexGrow: 1,
              }}
            /></>)
        }
      </View>
    </SafeArea>
  );

}
const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  container: {
    width: Dimensions.get('window').width - 20,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    margin: 10,

  },
  list: {

  },

});