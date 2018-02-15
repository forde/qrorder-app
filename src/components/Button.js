import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Button extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={() => this.props.onPress()}>
                <Text style={styles.text}>{this.props.label}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        borderWidth:3,
        borderColor:'#0088FF',
        paddingVertical: 15,
        paddingHorizontal:60,
    },
    text: {
        fontSize: 20,
        color: '#0088FF',
        fontWeight:'bold'
    }
});