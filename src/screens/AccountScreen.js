import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AuthSession } from 'expo';

import Login from './../components/Login';
import firebase from './../services/firebase';

class AccountScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Konto'
    }

    _onSignOutPress() {
        firebase.signOut();
    }

    render() {
        const { user } = this.props;
        console.log(user);
        return (
            <View style={styles.container}>

                {user &&
                    <View>
                        <Text> logged in as {user.displayName}</Text>

                        <TouchableOpacity onPress={this._onSignOutPress.bind(this)}>
                            <Text style={{marginTop:20}}>Wyloguj</Text>
                        </TouchableOpacity>
                    </View>
                }

                {!user &&
                    <Login />
                }
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const actions = {

}

export default connect(mapStateToProps, actions)(AccountScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#fff',
    },
    facebookLoginBtn: {
        backgroundColor: '#4862A3',
        height: 60, 
        flex:1,
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 30,
        overflow: 'hidden',
    },
    facebookLoginBtnText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 20,
    }
});