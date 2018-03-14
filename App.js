import { StackNavigator } from 'react-navigation';
import React from 'react';

import HomeScreen from './src/screens/HomeScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import ScanResult from './src/screens/ScanResultScreen';
import MenuSections from './src/screens/MenuSectionsScreen';


const RootStackNavigator = StackNavigator(
    {
        /*Home: {
            screen: HomeScreen,
        },*/
        Scanner: {
            screen: ScannerScreen,
        },
        ScanResult: {
            screen: ScanResult,
        },
        MenuSections: {
            screen: MenuSections,
        }
    },
    {
        //onTransitionEnd: nav => console.log('navigated to:', nav.scene.route.routeName),
    }
);


export default class App extends React.Component {

    state = {
        screenIndex: 0
    }

    _onNavigationStateChange(prevState, newState, action) {
        this.setState({screenIndex: newState.index})
    }

    render() {
        return (
            <RootStackNavigator 
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                screenProps={{screenIndex: this.state.screenIndex}}
            />
        );
    }
}