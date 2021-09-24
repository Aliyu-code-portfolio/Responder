import React, { useState } from 'react';
import * as firebase from 'firebase';

// import from local files
import { AccountNavigator } from './src/app_infrastructure/app_navigation/account.navigator';
import { AuthenticationContextProvider } from './src/app_services/authentication/authentication.context';
import { theme } from './src/app_infrastructure/theme';
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";

// or any pure javascript modules available in npm

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });
  if (!oswaldLoaded) {
    return null;
  }
  const firebaseConfig = {
    apiKey: 'AIzaSyC5JP7q6d4M21jrcA7R1zh6-NgtFlQMMBI',
    authDomain: 'laesna-d7c83.firebaseapp.com',
    projectId: 'laesna-d7c83',
    storageBucket: 'laesna-d7c83.appspot.com',
    messagingSenderId: '955485269180',
    appId: '1:955485269180:web:f66e1be2004d44911ab4b9',
    measurementId: 'G-23L5DWHGSZ',
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <AuthenticationContextProvider>
      <AccountNavigator />
    </AuthenticationContextProvider>
  );
}
