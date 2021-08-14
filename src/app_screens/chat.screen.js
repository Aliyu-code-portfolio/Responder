import React, { useState } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Searchbar } from "react-native-paper";

import { History } from '../app_components/History'
import { colors } from '../app_utils/colors'
import { paddingSizes } from '../app_utils/sizes'
import { SafeArea } from '../app_utils/safe-area.component'

export const Chat = () => {
  const [message, setMessage] = useState(null)
  const [tempMessage, setTempMessage] = useState('')

  //Methods

  //This sends the chat to a responder
  const sendMessage = (chat) => {
    console.log(chat)
  }

  return (
    <SafeArea>
      <View style={styles.container}>
        <ScrollView>
          <History send={true} message={message} />
        </ScrollView>
        <Searchbar
          icon="chat"
          placeholder="Send a chat message"
          value={tempMessage}
          onChangeText={(text) => setTempMessage(text)}
          onSubmitEditing=
          {({ nativeEvent }) => {
            if (!message) {
              setMessage(nativeEvent.text)
              setTempMessage('')
            }
            else {
              sendMessage(nativeEvent.text)
              setMessage(message + "\n" + nativeEvent.text)
              setTempMessage('')
            }
          }
          }

        />
      </View>
    </SafeArea>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap-reverse",
    justifyContent: 'flex-end',
    backgroundColor: colors.cornsilk,
    padding: paddingSizes.sm,
  },

});