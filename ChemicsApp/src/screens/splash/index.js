import React from 'react';
import { SafeAreaView, View, Text, Button, Alert } from 'react-native';

const SplashScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lime'}}>
                <Text>WSPLASH SFREEN</Text>
            </View>
        </SafeAreaView>
    );
}
    
export default SplashScreen;