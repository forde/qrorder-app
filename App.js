import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import React from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'; 

import vars from './src/vars';
import CartIcon from './src/components/CartIcon';

import ScannerScreen from './src/screens/ScannerScreen';
import PlaceScreen from './src/screens/PlaceScreen';
import MenuSections from './src/screens/MenuSectionsScreen';
import MenuDishes from './src/screens/MenuDishesScreen';
import CartScreen from './src/screens/CartScreen';
import AccountScreen from './src/screens/AccountScreen';


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

import { reducers } from './src/store';
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


export default class App extends React.Component {

    state = {
        screenIndex: 0
    }

    _onNavigationStateChange(prevState, newState, action) {
        this.setState({screenIndex: newState.index})
    }

    render() {
        return (
            <Provider store={store}>
                <RootTabNavigator 
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    screenProps={{screenIndex: this.state.screenIndex}}
                />
            </Provider>
        );
    }
}