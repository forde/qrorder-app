import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import vars from './vars';
import CartIcon from './components/CartIcon';

import ScannerScreen from './screens/ScannerScreen';
import PlaceScreen from './screens/PlaceScreen';
import MenuSections from './screens/MenuSectionsScreen';
import MenuDishes from './screens/MenuDishesScreen';
import CartScreen from './screens/CartScreen';
import AccountScreen from './screens/AccountScreen';


const ScannerNavigator = StackNavigator({
    Scanner: { screen: ScannerScreen },
});

const PlaceNavigator = StackNavigator({
    PlaceScreen: { screen: PlaceScreen},
    MenuSections: { screen: MenuSections },
    MenuDishes: { screen: MenuDishes }
});

const CartNavigator = StackNavigator({
    CartScreen: { screen: CartScreen },
});

const AccountNavigator = StackNavigator({
    Account: { screen: AccountScreen },
});

const RootTabNavigator = TabNavigator({
    ScannerNavigator: {
        screen: ScannerNavigator,
        navigationOptions: ({ navigation }) => ({
            title: 'Skaner',
        }),
    },
    PlaceNavigator: {
        screen: PlaceNavigator,
        navigationOptions: ({ navigation }) => ({
            title: 'Miejsce',
        }),
    },
    CartNavigator: {
        screen: CartNavigator,
        navigationOptions: ({ navigation }) => ({
            title: 'Zamówienie',
        }),
    },
    AccountNavigator: {
        screen: AccountNavigator,
        navigationOptions: ({ navigation }) => ({
            title: 'Konto',
        }),
    }
},
{
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if(routeName === 'ScannerNavigator') 
            return <MaterialCommunityIcons name="qrcode-scan" size={28} color={tintColor} />
        if(routeName === 'PlaceNavigator') 
            return <MaterialIcons name="restaurant" size={28} color={tintColor} />
        if(routeName === 'CartNavigator') 
            return <CartIcon tintColor={tintColor} />
        if(routeName === 'AccountNavigator') 
            return <MaterialCommunityIcons name="account" size={34} color={tintColor} />
        },
    }),
    tabBarOptions: {
        activeTintColor: vars.colors.interact,
        inactiveTintColor: 'gray',
        style: {
        paddingVertical:6,
        height:65,
        },
        tabStyle: {
            height:65
        },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    backBehavior: 'none',
});

export default RootTabNavigator;