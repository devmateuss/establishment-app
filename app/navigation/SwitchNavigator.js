import React from 'react'
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import DrawerNavigator from '../navigation/DrawerNavigation'

import LoginScreen from '../screens/LoginScreen'

const AuthStack = createStackNavigator({
    SignIn: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        },
    }
});

export default createAppContainer(createSwitchNavigator(
    {
        App: DrawerNavigator,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'Auth',
    }
));