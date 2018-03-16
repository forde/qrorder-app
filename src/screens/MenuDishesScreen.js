import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import firebase from './../services/firebase';
import vars from './../vars';
import CartItemPopup from './../components/CartItemPopup';

import { addToCart } from './../store';

class MenuDishesScreen extends React.Component {
    
    static navigationOptions({ navigation }) {
        const { params } = navigation.state;
        return {
            title: 'Menu - '+params.sectionName,
        }
    }

    state = {
        modalVisible: false,
        modalData: {}
    }

    _keyExtractor(item, index) {
        return index
    }

    _renderItem({item}) {
        return ( 
            <View style={styles.row}>
                <View style={styles.rowName}>
                    <Text style={styles.rowNametext}>{item.name}</Text>
                    <Text style={styles.rowDesctext}>{item.description}</Text>
                </View>
                {this.props.place.acceptingOrders ? (
                    <TouchableOpacity onPress={() => this._onAddToCartPress.bind(this)(item)} >
                        <View style={styles.addToCart}>
                            <Text style={styles.price}>{item.price} PLN</Text>
                            <MaterialIcons name="add-shopping-cart" size={26} color={vars.colors.interact} />
                        </View> 
                    </TouchableOpacity>
                ) : (
                    <Text style={styles.priceDisabled}>{item.price} PLN</Text>
                )}
            </View>
        );
    }

    _onAddToCartPress(item) {
        const data = {
            name: item.name,
            price: item.price,
            uuid: item.uuid,
            count: 1
        }
        this.setState({ 
            modalVisible: true,
            modalData: data
        });
    }

    _onAddToOrder() {
        this.setState({ modalVisible: false });
        const items = [...Array(this.state.modalData.count).keys()].map(slot => ({...this.state.modalData, count: 1}));
        console.log('ITEMS',items);
        this.props.addToCart(items);
        //console.log(this.state.modalData);
    }

    _onModalDataChange(updatedModalData) {
        this.setState({ modalData: updatedModalData });
    }

    _onCloseModal() {
        this.setState({ modalVisible: false });
    }

    render() {
        const { dishes } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <FlatList style={styles.list}
                    data={dishes}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem.bind(this)}
                />
                <CartItemPopup
                    visible={this.state.modalVisible}
                    modalData={this.state.modalData}
                    onModalDataChange={this._onModalDataChange.bind(this)}
                    onAddToOrder={this._onAddToOrder.bind(this)}
                    onRequestClose={this._onCloseModal.bind(this)}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        place: state.place,
    }
}

const actions = {
    addToCart
}

export default connect(mapStateToProps, actions)(MenuDishesScreen);

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
    rowNametext: {
        fontSize:18,
        marginBottom: 3,
    },
    rowDesctext: {
        color: '#828182',
        fontSize:13,
    },
    addToCart: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        marginRight: 6,
        color: vars.colors.interact,
    },
    priceDisabled: {
        fontSize: 16,
    },
});