import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet, ScrollView, TextInput} from 'react-native';
import { Icon } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import DateTimePicker from '@react-native-community/datetimepicker';

import DropDownPicker from 'react-native-dropdown-picker';

import { getOrder, updateOrder } from '../../api/orders';
import { getUser } from '../../async_storage/user';
import { getServices } from '../../api/services';
import { getServicesByDry } from '../../api/dry';
import { OrderContext } from '../../contexts/order.context';

// NEEDS STRONG REFACTORING
const AddOrderScreen = ({navigation, route}) => {
    const [name, onChangeName] = useState(''); // better to use something like reducer here!
    const [email, onChangeEmail] = useState('');
    const [dateOriginal, onChangeDateOriginal] = useState('');
    const [cost, onChangeCost] = useState('');
    const [order, setOrder] = useState('');
    const [status, onChangeStatus] = useState('');
    const [service, onChangeService] = useState('');
    const [user, setUser] = useState({}); // probably better just pass the prop from the parent component
    const [errorMessage, setErrorMessage] = useState('');
    const [services, setServices] = useState([]); // use service context here
    const [defaultID, setDefaultID] = useState('');
    const [statuses, setStatuses] = useState([{label: "В обработке", value: "processing"}, {label: "Готов к выдаче", value: "ready"}, {label: "Возврат", value: "refund"}]);
    const [refundStatus, setRefundStatus] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000)); // default needs to be set
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const { orders, setOrders, actions: { getOrders, getAllOrders }} = React.useContext(OrderContext);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    useEffect(() => {
        (async () => {
            const order = await getOrder({ id: route.params.id });
            setOrder(order);
            const res = await getServicesByDry({ id: order.service._id });
            const modifiedObect = res.map(item => {
                return { label: item.name, value: item._id };
            });
            onChangeStatus(order.state);
            setServices(modifiedObect);
            setDefaultID(order.service._id);
            if (order?.newName) {
                onChangeName(order.newName);
            } else {
                onChangeName(order.user.username);
            }
            if (order?.newCost) {
                onChangeCost(''+order.newCost)
            } else {
                onChangeCost(''+order.service.cost)
            }
            onChangeEmail(order.user.email);
            setDate(new Date(order.createdAt));
            onChangeDateOriginal(order.createdAt);
            onChangeStatus(order.state);
        })();
    }, []);

    const saveHandler = async () => {
        checkInputs();

        if (status != "refund") {
            setRefundStatus('');
        }

        const resultObject = {
            id: order._id,
            order: {
                state: status,
                user: order.user._id,
                newName: name,
                newCost: cost,
                service: service || defaultID,
                createdAt: date,
                message: refundStatus
            }
        };

        try {
            const orderResponse = await updateOrder(resultObject);
            // setOrders(orders.map(item => {
            //     if (item._id == order._id) {
            //         return resultObject;
            //     }
            //     return item;
            // }));
            navigation.popToTop();
        } catch (err) {
            setErrorMessage('ERROR!');
        }
    }

    const checkInputs = () => {
        if (!name.trim() || !email.trim() || !cost.trim()) {
            alert("Inputs should not be empty!")
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.rowContainer1}><Text>Order id: {route.params.id }</Text></View>
            <View style={styles.rowContainer}>
                <Text style={styles.text}>Nick-name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeName}
                    value={name}
                />
            </View>
            
            <View style={styles.rowContainer}>
                <Text style={styles.text}>Email:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                />
            </View>

            <View style={{width: "73%"}}>
                <Text style={styles.text}>Date created:</Text>
                <View >
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                </View>
            </View>

            <View style={[styles.rowContainer, {marginTop: 15}]}>
                <Text style={styles.text}>Cost:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeCost}
                    value={cost}
                />
            </View>

            <View style={styles.rowContainer2}>
                <Text style={styles.text}>Services:</Text>
                <DropDownPicker
                    items={services}
                    defaultValue={defaultID}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: '#fafafa'}}
                    containerStyle={{ justifyContent: "center", alignItems: "center", flexDirection: "row", width: "73%"}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => onChangeService(item.value)}
                />
            </View>

            <View style={styles.rowContainer3}>
                <Text style={styles.text}>Statuses:</Text>
                <DropDownPicker
                    items={statuses}
                    defaultValue={status}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: '#fafafa'}}
                    containerStyle={{ justifyContent: "center", alignItems: "center", flexDirection: "row", width: "73%"}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => {
                        onChangeStatus(item.value);
                        if (item.value == "refund") {
                            setShowDialog(true);
                        }
                    }}
                />
            </View>
            <View style={styles.dcontainer}>
                <DialogInput isDialogVisible={showDialog}
                    multiline = {true}
                    numberOfLines = {4}
                    title={"Refund Dialog"}
                    message={"Please enter the reason why you cancelled the order.."}
                    hintInput ={"Reasoning.."}
                    submitInput={ (inputText) => {setRefundStatus(inputText); setShowDialog(false);} }
                    closeDialog={ () => {setShowDialog(false)}}>
                </DialogInput>
            </View>
            
            <View style={{marginTop: "10%"}}>
                <Button style={styles.save} title="Save" onPress={() => saveHandler()} />
            </View>
            { errorMessage ? <Text style={styles.error}>{ errorMessage }</Text> : null }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    rowContainer3: {
        marginTop: "20%"
    },  
    rowContainer2: {
        // flex: 1,
        alignItems: "flex-start"
    },
    rowContainer1: {
        marginBottom: 15
    },
    error: {
        marginTop: 15,
        color: "red"
    },
    text: {
        marginBottom: 5
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      dcontainer: {
        flex: 1,
        backgroundColor: 'beige',
        alignItems: 'center',
        justifyContent: 'center',
      },
    input: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20
    },

});

export default AddOrderScreen;
