import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, Alert, StyleSheet, FlatList } from 'react-native';
import OrderItem from '../../components/order.item';

import { getServices } from '../../api/services';

import { OrderContext } from '../../contexts/order.context';
import { ServiceContext } from '../../contexts/service.context';

const OrdersScreen = ({ navigation }) => {
    const { orders, setOrders, actions: { getOrders }} = React.useContext(OrderContext);
    const { services, setServices, actions: { getServices }} = React.useContext(ServiceContext);

    useEffect(() => {
        if (!orders.length || !orders) {
            setOrders(await getOrders());
        }

        async function fetchServices() {
            setServices(await getServices({ services: [...route.params.item.services] }));
        }
        fetchServices();
    }, [])

    return (
        <SafeAreaView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                style={styles.container}
                keyExtractor={(item) => item._id}
                data={orders}
                renderItem={({item}) => <OrderItem item={item}/> }
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
