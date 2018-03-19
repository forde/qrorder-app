import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'; 
import * as firebase from 'firebase';

import Navigator from './src/Navigator';

import { reducers } from './src/store';
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

export default class App extends React.Component {

    state = {
        screenIndex: 0
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            store.dispatch({ type: 'SET_USER', payload: user })
        });
    }

    _onNavigationStateChange(prevState, newState, action) {
        this.setState({screenIndex: newState.index})
    }

    render() {
        return (
            <Provider store={store}>
                <Navigator 
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    screenProps={{screenIndex: this.state.screenIndex}}
                />
            </Provider>
        );
    }
}