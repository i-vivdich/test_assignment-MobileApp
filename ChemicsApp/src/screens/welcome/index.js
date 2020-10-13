import React from 'react';
import { SafeAreaView, View, Text, Button, Alert } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Welcome to the Dry Clenaer's App</Text>
                <Button title="Create Account" color="lime" onPress={() => navigation.navigate('CreateAccount')} />
                <Button title="Log In" color="orange" onPress={() => navigation.navigate('Login')} />
            </View>
        </SafeAreaView>
    );
}
    
export default WelcomeScreen;