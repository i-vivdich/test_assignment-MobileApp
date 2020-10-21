import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, Button, ScrollView, StyleSheet } from 'react-native';

import { AuthContext } from '../../contexts/auth_context';

const RestorePassScreen = ({ props }) => {
    const [email, onChangeEmail] = useState('');
    const [username, onChangeUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { actions: { restore }, state: { isRestore } } = React.useContext(AuthContext);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
            />
            <Button title="Restore Password" onPress={() => restore({email, username})} />
            { isRestore 
                ? 
                    (<View style={{marginTop: 20}}>
                        <Text>Your new password:{"\n"}</Text>
                        <Text style={styles.password}>{ isRestore }</Text>
                    </View>)
                : null
            }
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
    password: {
        color: 'red',
        fontWeight: "bold",
        fontSize: 20
    }
});

export default RestorePassScreen;