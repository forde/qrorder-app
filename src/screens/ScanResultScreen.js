import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from './../services/firebase';

export default class ScanResultScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Scan result'
    }

    componentWillMount() {
        /*firebase.addPlace({
            name: 'Ministerstwo Śledzia',
            city: 'legnica',
            street: 'centrum 00',
            menuSections: [
                {
                    name: 'Starters',
                    dishes: [
                        {
                            name: 'Soup',
                            descriptions: 'really good soup',
                            price: 10.99,
                            available: true,
                        }
                    ]
                }
            ]
        });*/
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Text>Scanned code: {params.scan}</Text>
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