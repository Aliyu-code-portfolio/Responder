import React,{useState} from 'react'
import {Text, View,ScrollView, StyleSheet} from 'react-native'

import {Messagebox} from './Messagebox'
export const History=({send, message})=>{
  
  return (
    <ScrollView style={styles.history}>
      <Messagebox messageText={message}/>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  history:{//use send to determine if it will left or right
    flexDirection:'row',
    flexWrap: "wrap-reverse",
    justifyContent: 'flex-end',
    
  },
})