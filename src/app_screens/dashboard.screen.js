import React, {useState, useContext} from 'react'
import {Text, View, ScrollView, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native'
import {AuthenticationContext} from '../app_services/authentication/authentication.context'
import { Ionicons } from '@expo/vector-icons';
//import from local files
import AcceptedRequest from '../app_components/AcceptedRequest';
import RejectedRequest from '../app_components/RejectedRequest'

//import from pure javascript modules available in npm
import { Card } from 'react-native-paper';

export const Dashboard =()=> {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <ImageBackground
    source= {require("../../assets/bgimg1.png")}
    style={styles.containerTop}>
    <View style={styles.container}>
    <ScrollView>
    <View>
      <TouchableOpacity style={{borderWidth:2, borderRadius:20 , width:45, backgroundColor:'green'}}
      onPress={()=>{
          onLogout()
      }}>
      <Ionicons name='arrow-undo-outline' size={40} color='red' />
      </TouchableOpacity>
      <Text style={styles.title}>Responder</Text>
    </View>
      <Text style={styles.paragraph}>
        Be Responsible in Your Response
      </Text>
      <Card style={{height:220, width:342,}}>
        <AcceptedRequest />
      </Card>
      <Card style={{marginTop:5, height:220, width:342,}}>
        <RejectedRequest />
      </Card>
      </ScrollView>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  containerTop:{
    flex:1,
    width:'100%',
    height:'100%',
  },
  container: {
    flex: 1,
    backgroundColor:'rgba(255,255,255,.1)',
    width:'100%',
    height:'100%',
    justifyContent: 'center',
    alignItems:'center',
    padding: 8,
  },
  title:{
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 26,
    justifyContent:'center',
    alignItems:'center',
    textAlign: 'center',
    color:'green'
  },
  paragraph: {
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle:'italic',
    textAlign: 'center',
  },
});
