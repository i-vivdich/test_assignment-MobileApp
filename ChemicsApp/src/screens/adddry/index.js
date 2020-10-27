import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet, ScrollView, TextInput} from 'react-native';

import { saveDry } from '../../api/dry';
import { getUser } from '../../async_storage/user';

import { DryContext } from '../../contexts/dry.context';

const AddDryScreen = ({ navigation }) => {
    const [title, onChangeTitle] = useState('');
    const [description, onChangeDescription] = useState('');
    const [services, OnChangeServices] = useState('');
    const [user, setUser] = useState({}); // probably better just pass the prop from the parent component
    const [errorMessage, setErrorMessage] = useState('');

    const { actions, dries, setDries } = React.useContext(DryContext);


    useEffect(() => {
        (async () => {
            setUser(await getUser());
        })();
    }, [])

    const saveHandler = async () => {
        checkInputs();

        try {
            const response = await saveDry({title, description, service_description: services, id: user.id});
            setDries([...dries, response]);
            navigation.navigate('AddServicesScreen', { id: response._id });
        } catch (err) {
            setErrorMessage('Such a Dry already exists!');
            onChangeTitle('');
        }
    }

    const checkInputs = () => {
        if (!title.trim() || !description.trim() || !services.trim()) {
            alert("Inputs should not be empty!")
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.rowContainer}>
                <Text style={styles.text}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTitle}
                    value={title}
                />
            </View>
            
            <View style={styles.rowContainer}>
                <Text style={styles.text}>Description</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeDescription}
                    value={description}
                />
            </View>
            
            <View style={styles.rowContainer}>
                <Text style={styles.text}>Services Description</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={OnChangeServices}
                    value={services}
                />
            </View>

            <Button style={styles.save} title="Save" onPress={() => saveHandler(title, description, services)} />
            { errorMessage ? <Text style={styles.error}>{ errorMessage }</Text> : null }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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

export default AddDryScreen;
