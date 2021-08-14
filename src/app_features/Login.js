import React, { useState, useContext } from 'react';
import { View, StyleSheet, ImageBackground, Alert } from 'react-native';

import { Text } from "../app_infrastructure/typography/text.component";
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Colors } from "react-native-paper";
// import from local files\
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
  Subtitle,
  EmailContainer,
  PasswordContainer,
} from "./app_styles/styles.feature";
import { SafeArea } from '../app_utils/safe-area.component'
import { Spacer } from "../app_infrastructure/spacer/spacer.component";
import DropMenu from '../app_components/DropMenu'
import { fontSizes, marginSizes, paddingSizes, spacing } from '../app_utils/sizes';
import { colors } from '../app_utils/colors';
// or any pure javascript modules available in npm

import { AuthenticationContext } from '../app_services/authentication/authentication.context'
export const Login = () => {
  //Hard coding?
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);

  return (
    <SafeArea>
      <ImageBackground
        source={require("../../assets/bdimg.jpg")}
        style={styles.containerTop}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Title>RESPONDER</Title>
            <Subtitle>LAESNA'S response system</Subtitle>
          </View>
          <AccountContainer>
            <AuthInput
              label="E-mail"
              value={email}
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(u) => setEmail(u)}
            />
            <Spacer size="large">
              <AuthInput
                label="Password"
                value={password}
                textContentType="password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(p) => setPassword(p)}
              />
            </Spacer>
            {error && (
              <ErrorContainer size="large">
                <Text variant="error">{error}</Text>
              </ErrorContainer>
            )}
            <Spacer size="large">
              {!isLoading ? (
                <AuthButton
                  icon="lock-open-outline"
                  mode="contained"
                  onPress={() => onLogin(email, password)}
                >
                  Login
                </AuthButton>
              ) : (
                <ActivityIndicator animating={true} color={Colors.red500} />
              )}
            </Spacer>
          </AccountContainer>
        </View>
      </ImageBackground>
    </SafeArea>
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
    alignItems: 'center',
  },

});
