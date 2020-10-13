import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button, ScrollView, StyleSheet, TextInput } from 'react-native';

import { createAccount } from '../../../api/authentication';
import { post } from '../../../api/fetch';

const CreateAccountScreen = ({ navigation, onCreation }) => {
    const [email, onChangeEmail] = useState('');
    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submit = async () => {
        try {
            const res = await post('/api/auth/signup', { username, email, password });
            console.log(await res.json())

            // const res = createAccount(username, email, password);
            // console.log(await res.json())
            // navigation.navigate('Home');
        } catch (err) {
            if (err) {
                setErrorMessage(err.message);
            }
            setErrorMessage("Something went wrong!");
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
            />
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeEmail(text)}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={text => onChangePassword(text)}
                value={password}
                secureTextEntry
            />
            <Button title="Create Account" onPress={submit}/>
            { errorMessage ? <Text>{ errorMessage }</Text> : null }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
        marginTop: 20,
    },
});

export default CreateAccountScreen;