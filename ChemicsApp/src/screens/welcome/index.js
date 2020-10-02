import React from 'react';
import { SafeAreaView, View, Text, Button, Alert } from 'react-native';

const buttonHandler = (source) => {
    return source === 'register' ? Alert.alert('register') : Alert.alert('login');
}

const WelcomeScreen = () => {
    return (
        <SafeAreaView>
            <View>
                <Text>Dry Cleaner's: All</Text>
            <Button
            title="Register"
            color="lime"
            onPress={buttonHandler.bind(this, 'register')}    
            />
            </View>
        </SafeAreaView>
    );
}
    
export default WelcomeScreen;