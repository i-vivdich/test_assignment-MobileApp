import React from 'react';
import { SafeAreaView, View, Text, Button, Alert } from 'react-native';

const AccountScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lime'}}>
                <Text>AccountScreen</Text>
            </View>
        </SafeAreaView>
    );
}
    
export default AccountScreen;