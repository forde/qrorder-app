import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from './../components/Button';

export default class AccountScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Konto'
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Konto</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
});