import React from 'react'
import { createStackNavigator, createDrawerNavigator, createAppContainer, Na } from 'react-navigation'
import { Icon } from 'react-native-elements'
import ListEstablishmentsScreen from '../screens/ListEstablishmentsScreen'
import RegisterEstablishmentScreen from '../screens/RegisterEstablishmentScreen'

import DrawerContainer from '../navigation/DrawerContainer'


const DrawerNavigator = createDrawerNavigator({
    Main: createStackNavigator({
        Home: {
            screen: ListEstablishmentsScreen,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon
                    name='bars'
                    type='font-awesome'
                    color='#fff'
                    size={35}
                    containerStyle={{
                        paddingLeft: 10
                    }}
                    onPress={() => console.log(navigation.openDrawer())}
                />,
                headerStyle: {
                    backgroundColor: "#4d4d4d"
                },
            })
        },
        Added: {
            screen: RegisterEstablishmentScreen,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon
                    name='bars'
                    type='font-awesome'
                    color='#fff'
                    size={35}
                    containerStyle={{
                        paddingLeft: 10
                    }}
                    onPress={() => console.log(navigation.openDrawer())}
                />,
                headerStyle: {
                    backgroundColor: "#4d4d4d"
                },
            })
        }
    }, { initialRouteName: "Home" })
}, { contentComponent: DrawerContainer })

export default createAppContainer(DrawerNavigator);