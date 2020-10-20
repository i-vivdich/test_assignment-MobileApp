import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet, ScrollView, TextInput} from 'react-native';
import AuthForm from '../../forms/auth-form';
import { login } from '../../api/authentication';
import { AuthContext } from '../../contexts/auth_context';

const LoginScreen = ({ navigation }) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { signIn } = React.useContext(AuthContext);

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
                onChangeText={text => onChangePassword(text)}
                value={password}
                secureTextEntry
            />
            <Button title="Log In" onPress={() => signIn({ email, password })} />
            { errorMessage ? <Text>{errorMessage}</Text> : null }
        
            <Button
                title="Restore Password"
                onPress={() => navigation.navigate('RestorePassScreen')}
            />
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

export default LoginScreen;