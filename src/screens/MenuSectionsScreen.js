import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class HomeScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Menu - kategorie'
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Menu</Text>
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