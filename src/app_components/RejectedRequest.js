import * as React from 'react';
import { Text, View, StyleSheet,ScrollView  } from 'react-native';

export default function RejectedRequest() {
  return (
    <View style={styles.container}>
    <Text style={styles.head}>Rejected Requests</Text>
      <ScrollView>
      <Text style={styles.list}>
      
      </Text>
      </ScrollView >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'rgba(255,255,255,.1)',
    width:'100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  head:{
    color:'red',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  list: {
    margin: 24,
    marginTop: 0,
    fontSize: 24,
    textAlign: 'center',
  },
  
});
