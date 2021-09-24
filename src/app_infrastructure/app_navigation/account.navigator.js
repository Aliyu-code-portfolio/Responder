import React, { useContext } from 'react'
import { ThemeProvider } from "styled-components/native";

import { AuthenticationContext } from "../../app_services/authentication/authentication.context"
import { Login } from '../../app_features/Login';
import { AppNavigator } from './app.navigation'

import { theme } from '../theme'

export const AccountNavigator = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <ThemeProvider theme={theme}>
      {isAuthenticated ? <AppNavigator /> : <Login />}
    </ThemeProvider>
  );
}