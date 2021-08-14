import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

import {fontSizes} from '../app_utils/sizes'
export const Messagebox=({messageText})=>{
 
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{messageText}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    width:200,
  },
  text:{
    fontSize: fontSizes.smd
  }
})