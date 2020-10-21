import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from './src/contexts/auth_context';

import HomeScreen from './src/screens/home';
import LoginScreen from './src/screens/login';
import WelcomeScreen from './src/screens/welcome'
import CreateAccountScreen from './src/screens/account/create_account'
import RestorePassScreen from './src/screens/restore_pass';
import SplashScreen from './src/screens/splash';
import OrdersScreen from './src/screens/orders';
import AccountScreen from './src/screens/account/view_account';

export default function App({ navigation }) {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const bottomTab = () => {
        return (
            <Tab.Navigator>
                <Tab.Screen name="HomeScreen" component={HomeScreen} />
                <Tab.Screen name="OrdersScreen" component={OrdersScreen} />
                <Tab.Screen name="AccountScreen" component={AccountScreen} />
            </Tab.Navigator>
        )
    }

    const { state } = React.useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='SplashScreen'
            >
                {state.isLoading ? (
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                ) : !state.userToken ? (
                    <React.Fragment>
                        <Stack.Screen
                            name="WelcomeScreen"
                            component={WelcomeScreen}
                            options={{
                                title: 'Welcome',
                                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                            }}
                        />
                        <Stack.Screen name="RestorePassScreen" component={RestorePassScreen} /> 
                        <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
                        <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    </React.Fragment>
                ) : (
                    <Stack.Screen name="Home" component={bottomTab} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
