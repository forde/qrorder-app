import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class ScannerScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Scanner'
    }
    
    state = {
        hasCameraPermission: null,
        scannerEnabled: false,
    };
    
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    componentWillReceiveProps(props) {
        if(props.screenProps.screenIndex === 1)
            this.setState({ scannerEnabled: true });
    }

    _handleBarCodeRead = ({ type, data }) => {
        this.setState({ scannerEnabled: false });
        this.props.navigation.navigate('ScanResult', { 
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
                        <View style={styles.overlay} />
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
    captureBoundsContainer: {
        flexDirection:'row',
    },
    captureBounds: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#0088FF',
        backgroundColor: 'transparent',
    },
});