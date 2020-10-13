import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Button, ScrollView, StyleSheet } from 'react-native';

import { post } from '../../api/fetch';

const RestorePassScreen = ({ navigation }) => {
    const [email, onChangeEmail] = useState('');
    const [username, onChangeUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPass, setShowPass] = useState('');
    const [pass, setPass] = useState('');

    const submit = async () => {
        try {
            const res = await post('/password', { email, username });
            setPass(res.pass);
            setShowPass(true);
        } catch (err) {
            if (err && err.error) {
                setErrorMessage(res.message)
            }
            setErrorMessage("Something went wrong");
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeEmail(text)}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeUsername(text)}
                value={username}
            />
            <Button title="Restore Password" onPress={submit} />
            { showPass ? <Text>Your new password: {pass}</Text> : null}
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

export default RestorePassScreen;