import React, { useState, createContext } from "react";
import { Alert } from 'react-native'
import * as firebase from "firebase";

import { loginRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  firebase.auth().onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = () => {
    Alert.alert(

      "Logout?",
      "Confirm logout",
      [
        {
          text: "Cancel",
          //save action to data base
          style: "cancel"
        },
        {
          text: "Confirm",
          //save action to database
          onPress: () => {
            firebase
              .auth()
              .signOut()
              .then(() => {
                setUser(null);
                setError(null);
              });
          }
        }
      ]
    );

  }
  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};