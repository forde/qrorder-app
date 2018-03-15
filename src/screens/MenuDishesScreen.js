import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import firebase from './../services/firebase';
import vars from './../vars';

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

    componentWillMount() {
        
    }

    _keyExtractor(item, index) {
        return index
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

    _countUp() {
        this.setState({ 
            modalData: {...this.state.modalData, count: this.state.modalData.count+1}
        });
    }

    _countDown() {
        if(this.state.modalData.count > 1) {
            this.setState({ 
                modalData: {...this.state.modalData, count: this.state.modalData.count-1}
            });
        }
    }

    _renderItem({item}) {
        return ( 
            <View style={styles.row}>
                <View style={styles.rowName}>
                    <Text style={styles.rowNametext}>{item.name}</Text>
                    <Text style={styles.rowDesctext}>{item.description}</Text>
                </View>
                <TouchableOpacity onPress={() => this._onAddToCartPress.bind(this)(item)} >
                    <View style={styles.addToCart}>
                        <Text style={styles.price}>{item.price} PLN</Text>
                        <MaterialIcons name="add-shopping-cart" size={26} color={vars.colors.interact} />
                    </View> 
                </TouchableOpacity>
            </View>
        );
    }

    _closeModal() {
        this.setState({ modalVisible: false });
    }

    _addToOrder() {
        this.setState({ modalVisible: false });
        this.props.addToCart(this.state.modalData);
        //console.log(this.state.modalData);
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
                <Modal animationType="fade" transparent={true} onRequestClose={() => null} visible={this.state.modalVisible} >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalItemName}>{this.state.modalData.name}</Text>
                            <Text style={styles.modalItemPrice}>{(this.state.modalData.count * Number(this.state.modalData.price)).toFixed(2)} PLN</Text>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={styles.countDown} onPress={() => this._countDown.bind(this)() }>
                                    <Text style={styles.countButtonText}>-</Text>
                                </TouchableOpacity>
                                <View style={styles.count}>
                                    <Text style={styles.countText}>{this.state.modalData.count}</Text>
                                </View>
                                <TouchableOpacity style={styles.countUp} onPress={() => this._countUp.bind(this)() }>
                                    <Text style={styles.countButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={styles.popupConfirmBtn} onPress={() => this._addToOrder.bind(this)() }>
                                    <Text style={styles.popupConfirmBtnText}>dodaj do zamówienia</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this._closeModal.bind(this)() }>
                                <Text style={styles.popupCancelText} >anuluj</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}

const actions = {
    addToCart
}

export default connect(null, actions)(MenuDishesScreen);

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
    modalOverlay: {
        backgroundColor: 'rgba(0,0,0,.85)',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 300,
        alignItems: 'center',
    },
    modalItemName: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 15 
    },
    modalItemPrice: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 20
    },
    countDown: {
        borderWidth:1,
        borderColor:'#fff',
        height: 60,
        width:80,
        justifyContent: 'center',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,.1)',
    },
    countUp: {
        borderWidth:1,
        borderColor:'#fff',
        height: 60,
        width:80,
        justifyContent: 'center',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,.1)',
    },
    count: {
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#fff',
        height: 60,
        flex:1,
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,.05)',
    },
    countText: {
        fontSize:22,
        color:'#fff',
        textAlign:'center',
    },
    countButtonText: {
        fontSize:32,
        lineHeight:32,
        color:'#fff',
        textAlign:'center',
    },
    popupConfirmBtn: {
        borderWidth:1,
        borderColor:'#fff',
        height: 60,
        justifyContent: 'center',
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,.1)',
        flex:1,
        marginVertical: 25,
    },
    popupConfirmBtnText: {
        fontSize:20,
        color:'#fff',
        textAlign:'center',
    },
    popupCancelText: {
        fontSize:20,
        color:'#fff',
    }
});