import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

class CartIcon extends React.Component {
    render() {
        console.log('cart icon', this.props.cart);
        return (
            <View>
                <MaterialCommunityIcons name="cart-outline" size={30} color={this.props.tintColor} />
                {this.props.cart.items[0] && <Text style={styles.badge}>{this.props.cart.items.length}</Text> }
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(CartIcon);

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top:0,
        left: -10,
        color: '#fff',
        fontSize:12,
        backgroundColor: '#f00',
        height: 20,
        minWidth:20,
        textAlign: 'center',
        padding: 3,
        borderRadius: 10,
        overflow:'hidden',
    }
});