import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from './../services/firebase';

export default class ScanResultScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Scan result'
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        const scanPathParts = params.scan.split('/');
        if(scanPathParts.length > 2) {
            const placeId = scanPathParts[scanPathParts.length - 2];
            firebase.getPlace(placeId)
                .then(snapshot => {
                    this.place = snapshot.val(); 
                    console.log(this.place);
                });
        }
        
    }

    render() {
        const { params } = this.props.navigation.state;
        const place = this.place;

        if(!this.place) return (
            <View style={styles.container}>
                <Text>Place not found</Text>
            </View>
        )
        
        
        return (
            <View style={styles.container}>
                <Text>Name: {place.name}</Text>
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