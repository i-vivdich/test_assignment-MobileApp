import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SafeAreaView, View, Text, Button, Alert, StyleSheet, FlatList } from 'react-native';

import OrderItem from '../../components/order.item';

import { getUser } from '../../async_storage/user';

import { OrderContext } from '../../contexts/order.context';
import { ServiceContext } from '../../contexts/service.context';

const OrdersScreen = ({ navigation }) => {
    const [currOrders, setCurrOrders] = useState([]);
    const { orders, setOrders, actions: { getOrders, getAllOrders }} = React.useContext(OrderContext);
    const { services, setServices, actions: { getServices }} = React.useContext(ServiceContext);
    const [user, setUser] = useState({}); // probably better just pass the prop from the parent component
    const [didMount, setDidMount] = useState(false); 

    useEffect(() => {
        (async () => {
            getServices();
        })();
        (async () => {
            const user = await getUser();
            setUser(user);
            if (user.roles.includes("ADMIN")) {
                getAllOrders();
            } else {
                getOrders();
            }
        })();
        
    }, []);


    useEffect(() => {
        if (!services.length || !services) {
            getServices();
        }
    }, [services]);


    useEffect(() => {
        // let unmounted = false;
        // console.log("ORDERS SCREEN EFFECT DEP ORDERS");
        // if (!unmounted) {
            setCurrOrders(orders.reduce((acc, item) => { // Probably react Use Memo here!
                const { cost, name } = services.filter(service => service._id == item.service)[0];
                acc.push({ ...item, cost, name});
                return acc;
            }, []));
        // }
        // return () => { unmounted = true };
    }, [orders]);

    return (
        <SafeAreaView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                style={styles.container}
                keyExtractor={(item) => item._id}
                data={currOrders}
                renderItem={({item}) => <OrderItem item={item}/> } // ASK HOW ITS BETTER TO PASS USER SO ITS NOT GETIING RENDERED EACH TIME ORDER ITEM IS RENDERED
            />
      </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
      margin: '3%',
      marginTop: '4%',
      width: '94%'
    },
  });

export default OrdersScreen;
