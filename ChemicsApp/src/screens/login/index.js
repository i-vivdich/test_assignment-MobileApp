import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import AuthForm from '../../forms/auth-form';
import { login } from '../../api/authentication'

const LoginScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <AuthForm
                buttonText="Log In"
                onSubmit={login}
                onAuthentication={() => navigation.navigate('Home')}
            >
            </AuthForm>
            <Button
                title="Create Account"
                onPress={() => navigation.navigate('CreateAccount')}
            />
        </SafeAreaView>
    );
}

export default LoginScreen;