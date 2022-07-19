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
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
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
