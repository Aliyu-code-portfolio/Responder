import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { Dashboard } from '../../app_screens/dashboard.screen';
import { UserInfo } from '../../app_screens/user.info.screen';
const InfoStack = createStackNavigator();

export const HomeNavigation = () => {
    return (
        <InfoStack.Navigator

            screenOptions={{
                ...TransitionPresets.ModalPresentationIOS,
                headerShown: false
            }}
        >

            <InfoStack.Screen name="DashboardMain" component={Dashboard} />
            <InfoStack.Screen name="UserInfo" component={UserInfo} />
        </InfoStack.Navigator>
    );
};
