import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AuthSession } from 'expo';

import firebase from './../services/firebase';

class Login extends React.Component {

    _onFacebookLoginPress = async () => {
        let redirectUrl = AuthSession.getRedirectUrl();
        
        console.log({ redirectUrl }); // You need to add this url to your authorized redirect urls on your Facebook app

        const state = '1234567890';
        let result = await AuthSession.startAsync({
        authUrl:
            `https://www.facebook.com/v2.12/dialog/oauth?response_type=code` +
            `&client_id=179689162754620` +
            `&redirect_uri=${encodeURIComponent(redirectUrl)}`+
            `&state=${state}`,
        });

        console.log('result', result.params.code, result.params.state);

        // THIS NEEDS TO RUN ON THE SERVER !!!!!!!!
        const SECRET = 'e2f3f814b3232f0c04f153d8b5c391f7'; // APP SECRET CAN NOT BE EXPOSED LIKE THIS!!!!!
        let tokenResponse = await fetch(
            `https://graph.facebook.com/v2.12/oauth/access_token?`+
            `client_id=179689162754620`+
            `&redirect_uri=${encodeURIComponent(redirectUrl)}`+
            `&client_secret=${SECRET}`+
            `&code=${result.params.code}`
        );
        const token = await tokenResponse.json();

        console.log('token:', token);
    
        firebase.doFacebookLogin(token.access_token);
    }

    render() {
        return (
            <View style={{flexDirection: 'row', paddingHorizontal: 30}}>
                <TouchableOpacity style={styles.facebookLoginBtn} onPress={this._onFacebookLoginPress.bind(this)}>
                    <Text style={styles.facebookLoginBtnText}>Zaloguj się przez Facebooka</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Login;

const styles = StyleSheet.create({
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