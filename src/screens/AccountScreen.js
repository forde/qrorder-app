import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AuthSession } from 'expo';

import firebase from './../services/firebase';

class AccountScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Konto'
    }

    _onFacebookLoginPress = async () => {
        //firebase.doFacebookLogin();

        let redirectUrl = AuthSession.getRedirectUrl();

        // You need to add this url to your authorized redirect urls on your Facebook app
        console.log({ redirectUrl });

        // NOTICE: Please do not actually request the token on the client (see:
        // response_type=token in the authUrl), it is not secure. Request a code
        // instead, and use this flow:
        // https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/#confirm
        // The code here is simplified for the sake of demonstration. If you are
        // just prototyping then you don't need to concern yourself with this and
        // can copy this example, but be aware that this is not safe in production.

        let result = await AuthSession.startAsync({
        authUrl:
            `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
            `&client_id=179689162754620` +
            `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
        });

        if (result.type !== 'success') {
            alert('Uh oh, something went wrong');
            return;
        }

        let accessToken = result.params.access_token;
        let userInfoResponse = await fetch(
        `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        console.log(userInfo);
        //this.setState({ userInfo });
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
                    <View style={{flexDirection: 'row', paddingHorizontal: 30}}>
                        <TouchableOpacity style={styles.facebookLoginBtn} onPress={this._onFacebookLoginPress.bind(this)}>
                            <Text style={styles.facebookLoginBtnText}>Facebook</Text>
                        </TouchableOpacity>
                    </View>
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