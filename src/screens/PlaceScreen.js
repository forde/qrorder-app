import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient, BlurView } from 'expo';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import firebase from './../services/firebase';
import vars from './../vars';

import { setPlace, setPlaceFetchError } from './../store';

class PlaceScreen extends React.Component {

    static navigationOptions({ navigation }) {
        const { params } = navigation.state;
        return {
            //header: null,
            title: params && params.placeName ? params.placeName : 'Miejsce',
            headerBackTitle: 'Miejsce',
            headerTransparent: true,
            headerBackground: <BlurView tint="light" intensity={80} style={StyleSheet.absoluteFill}/>
        }
    }

    componentWillMount() {
        if(this.props.scanResult && !this.props.place && this.props.screenProps.screenIndex === 1) {
            console.log('scan result on mount:', this.props.scanResult);
            this._fetchPlace.bind(this)(this.props.scanResult);
        }
    }

    componentWillReceiveProps(props) {
        if(props.screenProps.screenIndex === 1) {
            if(props.scanResult && !props.place) {
                console.log('scan result on props:', props.scanResult, props.placeFetchError);
                this._fetchPlace.bind(this)(props.scanResult);
            }
        }
    }

    _fetchPlace(keys) {
        const { placeId, codeId } = keys;
        firebase.getPlace(placeId)
            .then(snapshot => {
                //console.log('getPlace then:',snapshot.val());
                if(snapshot.val()) {
                    this.props.setPlace(snapshot.val(), placeId, codeId);
                    //update the nav bar title
                    this.props.navigation.setParams({placeName: this.props.place.name});
                } else {
                    this.props.setPlaceFetchError(true);
                }
            }).catch(e => {
                //console.log('getPlace catch:',e);
                this.props.setPlaceFetchError(true);
            });
    }

    _onMenuButtonPress() {
        this.props.navigation.navigate('MenuSections', { 
            placeId: this.props.place.placeId,
        });
    }

    render() {
        const { place, scanResult, placeFetchError } = this.props;
        const { height, width } = Dimensions.get('window');

        if(placeFetchError) return (
            <View style={styles.loaderContainer}>
                <Image style={{width: 150, height: 80}} source={require('./../images/brokenCode.png')} />
                <View style={{flexDirection: 'row',paddingHorizontal: 40, marginBottom:20 }}>
                    <View style={{borderTopWidth:1, borderColor: vars.colors.main, flex:1, marginTop:-2}} />
                </View>
                <Text style={{fontSize: 20, fontWeight: '800', marginBottom: 20 }}>Coś poszło nie tak</Text>
                <Text style={{textAlign:'center', paddingHorizontal: 40, fontSize:15}}>
                    Zeskanowany kod nie należy do żadnego z miejsc w naszej bazie danych.
                </Text>
                <Text style={{textAlign:'center', paddingHorizontal: 40, paddingVertical: 20, fontSize:15}}>
                    Upewnij się, że skanowany kod posiada logo QRorder.
                </Text>
                <Image style={{width: 200, height: 80}} source={require('./../images/example.png')} />
            </View>
        )

        if(!place && !scanResult) return (
            <View style={styles.loaderContainer}>
                <Image style={{width: 150, height: 132, marginBottom: 40}} source={require('./../images/instructionDark.png')} />
                <Text style={{textAlign:'center', paddingHorizontal: 40, fontSize:15}}>
                    Zeskanuj kod QR aby uzyskać informacje o miejscu w którym się znajdujesz
                </Text>
                <View style={{flexDirection: 'row', paddingHorizontal: 40, paddingTop:40}}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ScannerNavigator')}>
                        <Text style={styles.buttonText}>przejdź do skanera</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

        if(!place && scanResult) return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={vars.colors.main} />
            </View>
        )
        
        return (
            <ScrollView contentContainerStyle={{minHeight: height-65}}>
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
                                <MaterialCommunityIcons name="qrcode-scan" size={30} color="#1D1D1B" />
                            </View>
                            <Text style={{fontSize: 16, marginTop:-5}}>{place.codes[place.codeId].description}</Text>
                        </View>
                        {place.acceptingOrders ? (
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <View style={{width:50}}>
                                    <Ionicons name="md-checkmark-circle" size={32} color="#61AF0A" />
                                </View>
                                <Text style={{fontSize: 16, marginTop:-5, flexWrap: 'wrap', paddingRight: 50 }}>lokal przyjmuje zamówienia przez aplikację</Text>
                            </View>
                        ) : (
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <View style={{width:50}}>
                                    <Ionicons name="md-close-circle" size={32} color="#F55B23" />
                                </View>
                                <Text style={{fontSize: 16, marginTop:-5, flexWrap: 'wrap', paddingRight: 50}}>zamówienia przez aplikację nie są obecnie realizowane</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.goToMenu}>
                        <Text style={styles.goToMenuText}>Aby złożyć zamówienie wybierz z menu</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.button} onPress={this._onMenuButtonPress.bind(this)}>
                                <Text style={styles.buttonText}>zobacz menu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        scanResult: state.scanResult,
        place: state.place,
        placeFetchError: state.placeFetchError,
    }
}

const actions = {
    setPlace,
    setPlaceFetchError,
}

export default connect(mapStateToProps, actions)(PlaceScreen);

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
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
        height: 300,
        backgroundColor: vars.colors.main
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
        backgroundColor: vars.colors.main,
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