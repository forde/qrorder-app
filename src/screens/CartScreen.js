import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import vars from './../vars';
import CartItemPopup from './../components/CartItemPopup';

import { updateCartItem, removeCartItem } from  './../store';

class CartScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Zamówienie'
    }

    state = {
        modalVisible: false,
        modalData: {},
        oryginalModalData: {},
    }

    _keyExtractor(item, index) {
        return item.uuid
    }

    _onEditItemPress(item) {
        this.setState({ 
            modalVisible: true,
            modalData: item,
            oryginalModalData: item,
        });
    }

    _onCloseModal() {
        this.setState({ 
            modalVisible: false,
            modalData: this.state.oryginalModalData
        });
    }

    _onModalDataChange(updatedModalData) {
        this.setState({ modalData: updatedModalData });
    }

    _onUpdateOrder() {
        this.props.updateCartItem(this.state.modalData);
        this.setState({ modalVisible: false });
    }

    _onRemoveFromOrder() {
        this.props.removeCartItem(this.state.modalData);
        this.setState({ modalVisible: false });
    }

    _renderItem({item}) {
        return ( 
            <View style={styles.row}>
                <View style={styles.rowName}>
                    <Text style={styles.rowNameText}>{item.name}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>{item.count} x {item.price}PLN</Text>
                    <TouchableOpacity onPress={() => this._onEditItemPress.bind(this)(item)} >
                        <Text style={styles.editButtonText}>Edytuj</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _renderListFooter() {
        if(this.props.cart.items.length === 0) return <View/>

        const total = this.props.cart.items.reduce((acc, el) => {
            return acc + (el.price * el.count);
        },0);

        return (
            <View style={styles.listFooter}>
                <Text style={styles.summary}>Suma zamówienia: {total}PLN</Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.placeOrderButton} onPress={this._onPlaceOrderPress.bind(this)}>
                        <Text style={styles.placeOrderButtontext}>złóż zamówienie</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _onPlaceOrderPress() {
        this.props.navigation.navigate('SelectPaymentMethodScreen');
    }

    render() {

        if(this.props.cart.items.length === 0) return (
            <View style={styles.emptyCartContainer}>
                <MaterialCommunityIcons name="cart-outline" size={100} color={vars.colors.gray} />
                <Text style={styles.emptyCartText}>Koszyk jest pusty</Text>
                <Text style={styles.emptyCartText}>Dodaj pozycje z menu zeskanowanego miejsca aby zobaczyć je w zamówieniu</Text>
            </View>
        )

        return (
            <View style={styles.container}>
                <FlatList style={styles.list}
                    data={this.props.cart.items}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem.bind(this)}
                    ListFooterComponent={this._renderListFooter.bind(this)}
                />
                <CartItemPopup
                    visible={this.state.modalVisible}
                    modalData={this.state.modalData}
                    onModalDataChange={this._onModalDataChange.bind(this)}
                    onUpdateOrder={this.state.modalData.count !== this.state.oryginalModalData.count ? this._onUpdateOrder.bind(this) : null}
                    onRemoveFromOrder={this._onRemoveFromOrder.bind(this)}
                    onRequestClose={this._onCloseModal.bind(this)}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
    }
}

const actions = {
    updateCartItem,
    removeCartItem
}

export default connect(mapStateToProps, actions)(CartScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        borderBottomWidth:1,
        borderBottomColor: '#ccc',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255,255,255, .4)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowName: {
        paddingRight:10,
    },
    rowNameText: {
        fontSize:18,
        marginBottom: 3,
    },
    editButton: {
        height: 30,
        borderRadius: 15,
        paddingHorizontal: 15,
        overflow: 'hidden',
        backgroundColor: vars.colors.main,
        justifyContent: 'center',
        marginLeft: 10,
    },
    editButtonText: {
        fontSize:18,
        marginLeft: 15,
        textAlign: 'center',
        color: vars.colors.interact,
    },
    listFooter:{
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    summary: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize:18,
        fontWeight: '600',
    },
    placeOrderButton: {
        backgroundColor: vars.colors.interact,
        height: 60, 
        flex:1,
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 30,
        overflow: 'hidden',
    },
    placeOrderButtontext: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 20,
    },
    emptyCartContainer: {
        flex:1,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    emptyCartText: {
        color: vars.colors.gray,
        fontSize:16,
        marginTop:10,
        textAlign:'center',
        paddingHorizontal: 30
    }
});