import React from 'react';
import { SafeAreaView, View, Text, Button, Alert } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Welcome to the Dry Clenaer's App</Text>
                <Button title="Log In" color="lime" onPress={() => navigation.navigate('Login')} />
            </View>
        </SafeAreaView>
    );
}
    
export default WelcomeScreen;