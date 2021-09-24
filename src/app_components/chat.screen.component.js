import React, { useState, useEffect, BackHandler, useCallback, useLayoutEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import * as firebase from 'firebase'
import { Ionicons } from '@expo/vector-icons';

//Local imports
import { paddingSizes } from '../app_utils/sizes'
import { SafeArea } from '../app_utils/safe-area.component'
import { getTeam } from '../app_services/firebase.services/firebase.service.alert'

export const ChatScreen = ({ uid, setShow }) => {
    const [messages, setMessages] = useState([]);


    useLayoutEffect(() => {
        const getMess = firebase.firestore().collection('Users').doc(uid)
            .collection('Chats').orderBy('createdAt', 'desc')
            .onSnapshot(snapshot =>
                setMessages(snapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                })
                )))

        return getMess;
    }, [])

    const onSend = useCallback((messages = []) => {

        setMessages(previousMessages => GiftedChat.
            append(previousMessages, messages))
        const {
            _id,
            createdAt,
            text,
            user,
        } = messages[0]
        firebase.firestore().collection('Users').doc(uid).collection('Chats').add({
            _id,
            createdAt,
            text,
            user,
        })
    }, [])




    return (
        <SafeArea>
            <View style={{ width: '100%', height: '10%', backgroundColor: '#e0f7fa', borderWidth: 1, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        setShow(false)
                    }}
                >
                    <Ionicons name='arrow-back-circle-outline' size={40} color='green' />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', fontSize: 12, color: 'green' }}>
                    Back to Chats
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'red', position: 'absolute', right: 0, paddingRight: 10 }}>
                    {getTeam()}
                </Text>
            </View>
            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={true}
                onSend={messages => onSend(messages)}
                user={{
                    _id: firebase.auth()?.currentUser?.email,
                    name: getTeam(),
                    avatar: firebase.auth()?.currentUser?.photoURL ? firebase.auth().currentUser.photoURL : 'https://placeimg.com/140/140/any'
                }} />
        </SafeArea>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: "wrap-reverse",
        justifyContent: 'flex-end',
        backgroundColor: '#a5d6a7',
        padding: paddingSizes.sm,
    },

});