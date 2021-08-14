import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";

import { Chat } from '../../app_screens/chat.screen'
import { Dashboard } from '../../app_screens/dashboard.screen'


const Tab = createBottomTabNavigator()
const TAB_ICON = {
  Dashboard: 'home',
  Chat: 'chatbox-ellipses'
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Chat" component={Chat} options={{ header: () => null }} />
    </Tab.Navigator>
  </NavigationContainer>
)