import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import firebase from './../services/firebase';
import vars from './../vars';

export default class MenuDishesScreen extends React.Component {
    
    static navigationOptions({ navigation }) {
        const { params } = navigation.state;
        return {
            title: 'Menu - '+params.sectionName,
           // headerBackTitle: 'Miejsce',
            //headerTransparent: true,
           /// headerBackground: <BlurView tint="light" intensity={80} style={StyleSheet.absoluteFill}/>
        }
    }

    componentWillMount() {
        
    }

    _keyExtractor(item, index) {
        return index
    }

    _onAddToCartPress(item) {

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

    render() {
        const { dishes } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <FlatList style={styles.list}
                    data={dishes}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
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
    }
});