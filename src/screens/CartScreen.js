import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class CartScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Zamówienie'
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Cart</Text>
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