import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button, ScrollView, StyleSheet, TextInput } from 'react-native';

import { AuthContext } from '../../../contexts/auth_context';

const CreateAccountScreen = ({ navigation }) => {
    const [email, onChangeEmail] = useState('');
    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { actions: { create } } = React.useContext(AuthContext);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry
            />
            <Button title="Create Account" onPress={() => create({username, email, password})}/>
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