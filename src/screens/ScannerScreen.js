import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';

import { parseScanResult, resetScanResult, resetPlace, setPlaceFetchError, resetCart } from './../store';

class ScannerScreen extends React.Component {
    
    static navigationOptions({ navigation }) {
        const { params } = navigation.state;
        return {
            title: 'Skaner',
            header: null,
            headerBackTitle: 'Skaner',
        }
    }
    
    state = {
        hasCameraPermission: null,
        scannerEnabled: false,
    };
    
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});

        if(this.props.screenProps.screenIndex === 0) {
            this.setState({ scannerEnabled: true });
        }
    }

    componentWillReceiveProps(props) {
        if(props.screenProps.screenIndex === 0) {
            this.setState({ scannerEnabled: true });
        }
    }

    _handleBarCodeRead = ({ type, data }) => {
        console.log('scaned code:', data);

        this.props.setPlaceFetchError(false);
        this.props.resetScanResult();
        this.props.resetPlace();
        this.props.resetCart();

        this.props.parseScanResult(data);

        this.setState({ scannerEnabled: false });
        this.props.navigation.navigate('PlaceNavigator', { 
            scan: data,
        });
        
    }

    render() {
        const { hasCameraPermission } = this.state;
    
        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {

            if(!this.state.scannerEnabled) return <Text />;

            return (
                <View style={styles.container}>
                    <BarCodeScanner 
                    style={styles.scanner} 
                    onBarCodeRead={this._handleBarCodeRead} 
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    >
                        <View style={styles.overlay}>
                            <View style={styles.instruction}>
                                <Image style={{width: 100, height: 88}} source={require('./../images/instruction.png')} />
                                <Text style={styles.instructionText}>Zeskanuj kod QR</Text>
                            </View>
                        </View>
                        <View style={styles.captureBoundsContainer} >
                            <View style={styles.overlay} />
                            <View style={styles.captureBounds}/>
                            <View style={styles.overlay} />
                        </View>
                        <View style={styles.overlay} />
                    </BarCodeScanner>
                </View>
            );
        }
    }
}

const actions = {
    parseScanResult,
    resetScanResult, 
    resetPlace,
    setPlaceFetchError,
    resetCart,
}

export default connect(null, actions)(ScannerScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#000'
    },
    scanner: {
        flex: 1, 
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    overlay: {
        backgroundColor: '#000', 
        opacity: .5,
        flex:1
    },
    instruction: {
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center', 
    },
    instructionText: {
        color: '#fff', 
        fontSize:20, 
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        textAlign:'center'
    },
    captureBoundsContainer: {
        flexDirection:'row',
    },
    captureBounds: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: 'transparent',
    },
});