import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Button, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';

import { postOrder } from '../api/orders';
import { saveUser, getUser, updateUserField } from '../async_storage/user';
import { OrderContext } from '../contexts/order.context';
import { MoneyContext } from '../contexts/money.context';

const ServiceItem = (props) => {
    const [user, setUser] = useState({});
    const [visibleModal, setVisibleModal] = useState(false);
    const [orderMessage, setOrderMessage] = useState('');
    const [isServiceNotAvailable, setIsServiceNotAvailable] = useState(true);
    
    const { money, setMoney, actions } = React.useContext(MoneyContext);

    const { orders, setOrders, actions: { getOrders } } = React.useContext(OrderContext);

    useEffect(() => {
        (async () => {
            setUser(await getUser());
            // setIsAdmin(user.roles.includes("ADMIN"));
        })();

        setIsServiceNotAvailable(isServiceOrdered(props.item._id));
    }, [])

    useEffect(() => {
        (async () => {
            await getOrders();
        })();
    }, [])

    const toggleModal = () => {
        setVisibleModal(!visibleModal);
    };

    const handleOrder = async (id) => {
        let orderResponse, error;
        try {
            orderResponse = await postOrder({ user, service: {
                id: id
            }});
            await updateUserField('balance', orderResponse.newBalance);
            setMoney(orderResponse.newBalance);
            setUser(await getUser());
            setOrders([...orders, orderResponse.order]);
            setIsServiceNotAvailable(true);
        } catch (err) {
            console.log(err);
        } finally {
            // error ? setOrderMessage(error) : setOrderMessage(orderResponse.message);
        }
    }

    const isServiceOrdered = id => orders.map(order => order.service).includes(id);

    return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.name}>{props.item.name.toUpperCase()}</Text>
                </View>
                <TouchableOpacity 
                    disabled={(props.item.cost > user.balance || isServiceNotAvailable)}
                    style={ isServiceNotAvailable ? styles.used : ( props.item.cost > user.balance ? styles.disabled : styles.button) } onPress={() => { handleOrder(props.item._id) }}>
                        <Text style={styles.text}>{props.item.cost}$</Text>
                </TouchableOpacity>
                <Modal isVisible={visibleModal}>
                    <View style={{ position: 'absolute', top: -50, width: 200, height: 200}}>
                        <Text>{ orderMessage }</Text>
                    </View>
                    <Button title="OK!" onPress={toggleModal} />
                </Modal>
            </View>
    );
}

const styles = StyleSheet.create({
    used: {
        backgroundColor: 'grey',
        padding: 10,
        justifyContent: "center",
        alignItems: "flex-end",
        borderRadius: 50,
        flexDirection: "row",
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2
    },
    disabled: {
        backgroundColor: 'red',
        padding: 10,
        justifyContent: "center",
        alignItems: "flex-end",
        borderRadius: 50,
        flexDirection: "row",
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2
    },
    name: {
        fontWeight: "bold"
    },
    order: {
        color: "lightgray",
        marginRight: 10,
        textAlign: "center",
        justifyContent: "center",

    },
    button: {
        backgroundColor: "blue",
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
        paddingRight: 10,
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

export default ServiceItem;
