import React from 'react'
import {Platform} from 'react-native'
import { createAppContainer,createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AntDesign,MaterialIcons} from '@expo/vector-icons'

import StartUpScreen from '../screens/StartUpScreen'
import HomeScreen from '../screens/HomeScreen'
import OrderScreen from '../screens/OrderScreen'
import OrderDetailScreen from '../screens/OrderDetailScreen'
import UserIndex from '../screens/user/index'
import LoginScreen from '../screens/auth/Login'
import RegisterScreen from '../screens/auth/Register'

const navigationOptions = {
//   title: "RflbestbuyRFL",
  headerStyle: {
    backgroundColor: "#f4511e"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold"
  }
};



const MainNavigator = createStackNavigator({

    Home: HomeScreen,
    Order: OrderScreen,
    OrderDetail: OrderDetailScreen,
})


const tabScreenConfig = {
    Home: {
            screen: MainNavigator,
            navigationOptions: {
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="home" size={30} />;
                }
            }
    },
    Account: {
        screen: UserIndex,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <AntDesign name="user" size={30} />
            },
            tabBarColor: 'gray'
        }
  }
};


const AppNavigator = Platform.OS == 'android' ? createMaterialBottomTabNavigator(tabScreenConfig, {
    shifting: true, //TabBarColor
    activeColor: 'red',
    barStyle: {
        backgroundColor: 'white'
    }

}) : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        activeTintColor: 'red'
    }
})


const DrawerNavigator = createDrawerNavigator({
    Home: AppNavigator,
    Order: {
        screen: OrderScreen
    }
}, {
    defaultNavigationOptions: navigationOptions
})


const combineNavigator = createSwitchNavigator({
    Start: StartUpScreen,
    Drawer: DrawerNavigator,
    Login: LoginScreen,
    Register: RegisterScreen
})




export default createAppContainer(combineNavigator);