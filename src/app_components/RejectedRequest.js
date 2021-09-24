import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { getPerformance, getTeam } from '../app_services/firebase.services/firebase.service.alert'

export default function RejectedRequest() {
  const [list, setList] = useState(null)

  const setHistory = (list) => {
    setList(list)
    console.log(list)
  }

  useEffect(() => {
    getPerformance("Reject", getTeam(), setHistory)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Rejected Requests</Text>
      <View style={{ flex: 1, flexGrow: 1 }}>
        <FlatList
          data={list}
          renderItem={({ item }) => {
            return (
              <Text style={styles.list}>{'\u2022 '}{item}</Text>
            )
          }
          }
          contentContainerStyle={{
            flexGrow: 1,
          }}
        />
      </View>
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
    textDecorationLine: 'underline',
    color: 'red',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  list: {
    color: 'red',
    marginTop: 12,
    fontSize: 14,
  },

});
