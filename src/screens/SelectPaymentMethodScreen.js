import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class SelectPaymentMethodScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Płatność'
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>SelectPaymentMethodScreen</Text>
            </View>
        );
    }
}

export default SelectPaymentMethodScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#fff',
    },
});