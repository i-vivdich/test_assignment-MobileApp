import React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';


const CreateAccountScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View>
                <Text>Create Account SCREEN</Text>
                <Button
                    title="Create Account"
                />
                <Button title="Log In" onPress={() => navigation.navigate('Login')}/>
            </View>
        </SafeAreaView>
    );
}

export default CreateAccountScreen;