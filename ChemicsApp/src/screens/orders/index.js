import React from 'react';
import { SafeAreaView, View, Text, Button, Alert } from 'react-native';

const OrdersScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lime'}}>
                <Text>OrdersScreen</Text>
            </View>
        </SafeAreaView>
    );
}
    
export default OrdersScreen;