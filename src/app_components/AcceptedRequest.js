import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPerformance, getTeam } from '../app_services/firebase.services/firebase.service.alert'
export const AcceptedRequest = ({ reload }) => {
  const [list, setList] = useState(null)

  const setHistory = (list) => {
    setList(list)
  }

  useEffect(() => {
    getPerformance("Accept", getTeam(), setHistory)
  }, [reload])

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Accepted Requests</Text>
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
    color: 'green',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  list: {
    color: 'green',
    marginTop: 12,
    fontSize: 14,
  },
});
