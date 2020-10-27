import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet, ScrollView, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { saveServices } from '../../api/dry';
import { getUser } from '../../async_storage/user';

const AddServicesScreen = ({ navigation, route }) => {
    const [user, setUser] = useState({}); // probably better just pass the prop from the parent component
    const [errorMessage, setErrorMessage] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [serviceCost, setServiceCost] = useState('');
    const [services, setServices] = useState([]);

    useEffect(() => {
        (async () => {
            setUser(await getUser());
        })();
    }, [])

    const validateInputs = () => {
        if (!serviceName.trim() || !serviceCost.trim()) {
            alert("Inputs should not be empty!");
            return false;
        }

        return true;
    }

    const addService = () => {
        if (validateInputs()) {
            setServices([...services, { name: serviceName, cost: serviceCost }]);
        }

        setServiceName('');
        setServiceCost('');
    }

    const saveHandler = async () => {
        if (!services.length) {
            alert("Add at least one service!");
            return;
        }

        try {
            if (serviceName && serviceCost) {
                await saveServices({ id: route.params.id, services: [...services, { name: serviceName, cost: serviceCost }]});
            } else {
                await saveServices({ id: route.params.id, services: services});
            }
            navigation.popToTop();
        } catch (err) {
            console.log(err)
            setErrorMessage('Error!');
        }
    }

    return (
        <ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => addService()}>
                    <Text>Add Service</Text>
                </TouchableOpacity>
            </View>

            <View style={{flex: 1, height: 1, backgroundColor: 'lightgrey', marginLeft: "5%", marginRight: "5%"}} />
            <View style={{flex: 1,  marginLeft: "5%", marginRight: "5%"}}>
                {services.length ? <Text style={{margin: "3%"}}>Services added: {services.length}</Text> : null}
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: 'lightgrey', marginLeft: "5%", marginRight: "5%"}} />
            <View style={styles.rowContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Service Name:</Text>
                    <TextInput 
                        onChangeText={setServiceName}
                        value={serviceName}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Service Cost:</Text>
                    <TextInput 
                        onChangeText={setServiceCost}
                        value={serviceCost}
                        style={styles.input}
                    />
                </View>
            </View>

            <Button style={styles.save} title="Save All Services" onPress={() => saveHandler()} />
            { errorMessage ? <Text style={styles.error}>{ errorMessage }</Text> : null }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-start",
        borderRadius: 50,
        borderColor: "lightgrey",
        borderWidth: 1,
        margin: "25%",
        marginTop: "5%",
        padding: "2%",
        marginBottom: "5%"
    },
    button: {
        margin: "2%"
    },  
    inputContainer: {
        marginBottom: 10,
        marginTop: 10
    },
    rowContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: "3%",
        marginTop: "7%"
    },
    error: {
        marginTop: 15,
        color: "red"
    },
    text: {
        marginBottom: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    input: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20
    },

});

export default AddServicesScreen;
