import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Button, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { getUser } from '../async_storage/user';

import { postOrder } from '../api/orders';
import { OrderContext } from '../contexts/order.context';
 
const OrderItem = (props) => {
    const [user, setUser] = useState(false); // probably better just pass the prop from the parent component
    const navigation = useNavigation();
    const { orders, setOrders, actions: { getOrders, getAllOrders }} = React.useContext(OrderContext);

    useEffect(() => {
        (async () => {
            const user = await getUser();
            setUser(!user.roles.includes("ADMIN"));
        })();
    }, []);

    const handleOrderStatus = () => {
        if (user) {
            setOrders(orders.filter(item => item._id != props.item._id))
            console.log('user clicked to finish the order')
        } else {
            navigation.navigate('OrdersTab', { screen: 'AddOrderScreen', initial: false, params: { id: props.item._id}});
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.name}>{props.item.name.toUpperCase()}</Text>
            </View>
            { user 
                ?    
                    <TouchableOpacity 
                    style={ styles.button } onPress={() => { handleOrderStatus() }}>
                        <Text style={styles.text}>{ props.item.state == 'processing' ? 'В обработке...' : "Завершить!" }</Text>
                </TouchableOpacity>
                
                :
                <TouchableOpacity 
                style={ styles.button } onPress={() => { handleOrderStatus() }}>
                    <Text style={styles.text}>{ props.item.state == 'processing' ? 'Новый' : "Завершен" }</Text>
            </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    name: {
        fontWeight: "bold"
    },
    button: {
        backgroundColor: "green",
        padding: 10,
        justifyContent: "center",
        alignItems: "flex-end",
        borderRadius: 50,
        flexDirection: "row",
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2
      },
      text: {
        justifyContent: "center",
        color: "white",
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 17,
        textAlign: "center"
      },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: 'grey',
        borderWidth: 3,
        borderRadius: 50,
        marginBottom: 15,
        marginLeft: '2%',
        marginRight: '2%'
    },
    title: {
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 35
    },
})

export default OrderItem;
