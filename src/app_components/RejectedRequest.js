import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { getPerformance } from '../app_services/firebase.services/firebase.service.alert'

export default function RejectedRequest() {
  const [list, setList] = useState(getPerformance("Reject"))
  const history = list;
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Rejected Requests</Text>
      <ScrollView>
        {
          history ? (history.map(d => (
            <Text style={styles.list}>
              {'\u2B24'}  {d}
            </Text>))) : (<Text style={styles.list}>
            </Text>)}
      </ScrollView >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,.1)',
    width: '100%',
    height: '100%',
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
  head: {
    color: 'red',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  list: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: 'bold'
  },

});
