import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient, BlurView } from 'expo';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import firebase from './../services/firebase';

export default class ScanResultScreen extends React.Component {

    static navigationOptions({ navigation }) {
        const { params } = navigation.state;
        return {
            title: params && params.placeName ? params.placeName : '...',
            headerBackTitle: 'Skaner',
            headerTransparent: true,
            headerBackground: <BlurView tint="light" intensity={80} style={StyleSheet.absoluteFill}/>
        }
    }
    
    constructor() {
        super();

        this.state = {
            place: null,
            placeId: null,
            codeId: null
        }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        const scanPathParts = params ? params.scan.split('/') : [];
        let placeId = scanPathParts.length > 2 ? scanPathParts[scanPathParts.length - 2] : null;
        let codeId = scanPathParts.length > 2 ? scanPathParts[scanPathParts.length - 1] : null;
              
        // dev only
        if(!placeId) placeId = '-L503-GcpjkXZ0lTc3CF';
        if(!codeId) codeId = '-L503-GgFplpDqkW2Bka';

        firebase.getPlace(placeId)
            .then(snapshot => {
                this.setState({
                    place: snapshot.val(),
                    placeId: placeId,
                    codeId: codeId
                }, () => {
                    console.log(this.state.place);
                    //update the nav bar title
                    this.props.navigation.setParams({placeName: this.state.place.name});
                });
            });
        
    }

    _onMenuButtonPress() {

    }

    render() {
        const { params } = this.props.navigation.state;
        const { place, placeId, codeId } = this.state;
        //console.log(place);

        if(!place) return (
            <View style={styles.container}>
                <Text>Place not found</Text>
            </View>
        )
        
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.imageContainer}>
                        <Image resizeMode="cover" style={styles.overlay} source={{uri: place.image}} />
                        <LinearGradient colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.8)']} style={styles.overlay}>
                            <Text style={styles.placeName}>{place.name}</Text>
                            <Text style={styles.placeAddress}>{place.city}, {place.street}</Text>
                        </LinearGradient>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.status}>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                            <View style={{width:50}}>
                                <MaterialCommunityIcons name="qrcode-scan" size={32} color="#1D1D1B" />
                            </View>
                            <Text style={{fontSize: 16}}>{place.codes[codeId].description}</Text>
                        </View>
                        {place.acceptingOrders ? (
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <View style={{width:50}}>
                                    <Ionicons name="md-checkmark-circle" size={38} color="#61AF0A" />
                                </View>
                                <Text style={{fontSize: 16}}>kelner przyjmuje zamówienia</Text>
                            </View>
                        ) : (
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <View style={{width:50}}>
                                    <Ionicons name="md-close-circle" size={38} color="#F55B23" />
                                </View>
                                <Text style={{fontSize: 16}}>kelner nie przyjmuje zamówień</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.goToMenu}>
                        <Text style={styles.goToMenuText}>Aby złożyć zamówienie wybierz z menu</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.button} onPress={this._onMenuButtonPress}>
                                <Text style={styles.buttonText}>zobacz menu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    top: {
        flexDirection: 'row',        
    },
    imageContainer: {
        flex:1,
        height: 280,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        padding: 25,
    },
    placeName: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    placeAddress: {
        color: '#fff',
        fontSize: 16,
        paddingTop: 5
    },
    body: {
        flexDirection: 'column',
        flex:1,
        justifyContent: 'space-between',
        padding: 25,
    },
    status: {

    },
    goToMenu: {
        flexDirection: 'column',
    },
    goToMenuText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20
    },
    button: {
        backgroundColor: '#1D1D1B',
        height: 60, 
        flex:1,
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 1,
        overflow: 'hidden',
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 20,
    }
});