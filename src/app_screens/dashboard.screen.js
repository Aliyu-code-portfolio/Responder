import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Text, View, RefreshControl, BackHandler, ScrollView, StyleSheet, Alert, TouchableOpacity, ImageBackground, } from 'react-native'
import { AuthenticationContext } from '../app_services/authentication/authentication.context'
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

//import from local files
import { listenToHelp, getTeam } from '../app_services/firebase.services/firebase.service.alert'
import { AcceptedRequest } from '../app_components/AcceptedRequest';
import RejectedRequest from '../app_components/RejectedRequest'

//import from pure javascript modules available in npm
import { Card } from 'react-native-paper';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export const Dashboard = ({ navigation }) => {
  const { onLogout } = useContext(AuthenticationContext)
  const [refreshing, setRefreshing] = useState(false);
  const [sound, setSound] = useState();
  const [reloader, setReload] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false)
      setReload(!reloader)
    });
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    listenToHelp(getTeam(), navigation, playSound)
  }, [])

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/soundIt.wav')
    );
    setSound(sound);

    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);
  return (
    <ImageBackground
      source={require("../../assets/bgimg1.png")}
      style={styles.containerTop}>
      <View style={styles.container}>
        <ScrollView
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          <View>
            <View style={{ alignItems: 'flex-end', elevation: 40, }}>
              <TouchableOpacity style={{ borderRadius: 10, width: 45, }}
                onPress={() => {
                  onLogout()
                }}>
                <Ionicons name='log-out-outline' size={40} color='red' />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>{getTeam()} Responder</Text>
          </View>
          <Text style={styles.paragraph}>
            Be Responsible in Your Response
      </Text>
          <Card style={{ height: 210, width: 342, }}>
            <AcceptedRequest reload={reloader} />
          </Card>
          <Card style={{ marginTop: 5, height: 210, width: 342, }}>
            <RejectedRequest reload={reloader} />
          </Card>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,.1)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  title: {
    paddingTop: 5,
    fontWeight: 'bold',
    fontSize: 26,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'green'
  },
  paragraph: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
