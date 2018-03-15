import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';

import firebase from './../services/firebase';
import vars from './../vars';

export default class MenuSectionsScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Menu - kategorie',
        headerBackTitle: 'Kategorie'
    }

    constructor() {
        super();

        this.state = {
            sections: null
        }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        if(params.placeId) {
            firebase.getPlaceMenu(params.placeId)
                .then(snapshot => {
                    if(snapshot.val().sections) {
                        this.setState({
                            sections: snapshot.val().sections,
                        }, () => {
                            console.log('Sections: ',this.state.sections);
                        });
                    } else {
                        this.setState({
                            sections: [],
                        }, () => {
                            console.log('Sections: ',this.state.sections);
                        });
                    }
                });
        }
    }

    _keyExtractor(item, index) {
        return index
    }

    _onPressItem(item) {
        this.props.navigation.navigate('MenuDishes', { 
            dishes: item.dishes,
            sectionName: item.name,
        });
    }

    _renderItem({item}) {
        //console.log(item);
        return ( 
            <TouchableOpacity onPress={() => this._onPressItem.bind(this)(item)}>
                <View style={styles.row}>
                    <View style={styles.rowName}>
                        <Text style={styles.rowNametext}>{item.name}</Text>
                        <Text style={styles.countText}>{item.dishes.length}</Text>
                    </View>
                    <Feather name="chevron-right" size={32} color={vars.colors.main} />
                </View>
            </TouchableOpacity>
        );
    }

    render() {

        if(!this.state.sections) return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={vars.colors.main} />
            </View>
        )

        return (
            <View style={styles.container}>
                <FlatList style={styles.list}
                    data={this.state.sections}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
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
        flexDirection: 'row',
    },
    rowNametext: {
        fontSize:18,
        paddingRight: 10,
    },
    countText: {
        fontSize:12,
        backgroundColor: '#ccc',
        height: 24,
        minWidth:24,
        textAlign: 'center',
        padding: 4,
        borderRadius: 12,
        overflow:'hidden',
        borderWidth: 1,
        borderColor: 'transparent',
    }
});