import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';

export default class CartItemPopup extends React.Component {

    _price(modalData) {
        return (modalData.count * Number(modalData.price)).toFixed(2)+' PLN';
    }

    _countDown(modalData) {
        if(modalData.count > 1) {
            const updatedModalData = {...modalData, count: Number(modalData.count)-1};
            this.props.onModalDataChange(updatedModalData);
        }     
    }

    _countUp(modalData) {
        const updatedModalData = {...modalData, count: Number(modalData.count)+1};
        this.props.onModalDataChange(updatedModalData);
    }

    render() {
        const { visible, modalData, onAddToOrder, onUpdateOrder, onRemoveFromOrder, onRequestClose } = this.props;

        if(!visible) return <View />

        return (
            <Modal animationType="fade" transparent={true} onRequestClose={() => null} visible={visible} >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalItemName}>{modalData.name}</Text>
                        <Text style={styles.modalItemPrice}>{this._price(modalData)}</Text>
                        <View style={{flexDirection:'row', marginBottom: 25}}>
                            <TouchableOpacity style={styles.countDown} onPress={() => this._countDown.bind(this)(modalData) }>
                                <Text style={styles.countButtonText}>-</Text>
                            </TouchableOpacity>
                            <View style={styles.count}>
                                <Text style={styles.countText}>{modalData.count}</Text>
                            </View>
                            <TouchableOpacity style={styles.countUp} onPress={() => this._countUp.bind(this)(modalData) }>
                                <Text style={styles.countButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        {onAddToOrder && 
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={styles.popupConfirmBtn} onPress={() => onAddToOrder() }>
                                    <Text style={styles.popupConfirmBtnText}>dodaj do zamówienia</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {onUpdateOrder &&
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={styles.popupConfirmBtn} onPress={() => onUpdateOrder() }>
                                    <Text style={styles.popupConfirmBtnText}>zaktualizuj zamówienie</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {onRemoveFromOrder &&
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={styles.popupRemoveBtn} onPress={() => onRemoveFromOrder() }>
                                    <Text style={styles.popupRemoveBtnText}>usuń z zamówienia</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {onRequestClose &&
                            <TouchableOpacity onPress={() => onRequestClose() }>
                                <Text style={styles.popupCancelText} >anuluj</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalOverlay: {
        backgroundColor: 'rgba(0,0,0,.9)',
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
        marginBottom: 25,
    },
    popupConfirmBtnText: {
        fontSize:20,
        color:'#fff',
        textAlign:'center',
    },
    popupRemoveBtn: {
        borderWidth:1,
        borderColor:'#EE3333',
        height: 60,
        justifyContent: 'center',
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: 'rgba(238,51,51,.1)',
        flex:1,
        marginBottom: 25,
    },
    popupRemoveBtnText: {
        fontSize:20,
        color:'#EE3333',
        textAlign:'center',
    },
    popupCancelText: {
        fontSize:20,
        color:'#fff',
    }
});