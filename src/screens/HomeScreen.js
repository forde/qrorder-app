import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from './../components/Button';

export default class HomeScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <View style={styles.container}>
                <Button label="Scan" onPress={() => this.props.navigation.navigate('Scanner')} />
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