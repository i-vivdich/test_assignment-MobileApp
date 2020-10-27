import React, { lazy } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Button } from 'react-native'

import { AuthContext } from './src/contexts/auth_context';

import HomeScreen from './src/screens/home';
import LoginScreen from './src/screens/login';
import WelcomeScreen from './src/screens/welcome'
import CreateAccountScreen from './src/screens/account/create_account'
import RestorePassScreen from './src/screens/restore_pass';
import SplashScreen from './src/screens/splash';
import OrdersScreen from './src/screens/orders';
import AccountScreen from './src/screens/account/view_account';
import DryScreen from './src/screens/dry';
import AddDryScreen from './src/screens/adddry';
import AddServicesScreen from './src/screens/addServices';
import AddOrderScreen from './src/screens/addOrder';

export default function App({ navigation, route }) {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const HomeScreenDispays = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="DryScreen" component={DryScreen} />
                <Stack.Screen name="AddDryScreen" component={AddDryScreen}/>
                <Stack.Screen name="AddServicesScreen" component={AddServicesScreen}/>
            </Stack.Navigator>
        )
    }

    const OrdersScreenDisplays = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
                <Stack.Screen name="AddOrderScreen" component={AddOrderScreen} />
            </Stack.Navigator>
        )
    }

    const bottomTab = () => {
        return (
        <Tab.Navigator>
                <Tab.Screen 
                    name="MainScreen" 
                    component={HomeScreenDispays}
                    options={{
                    }}/>
                <Tab.Screen name="OrdersTab" component={OrdersScreenDisplays} />
                <Tab.Screen name="AccountScreen" component={AccountScreen} />
            </Tab.Navigator>
        )
    }

    const { state, actions: { signOut }} = React.useContext(AuthContext);

    function getHeaderTitle(route) {
        const routeName = route.state
          ? route.state.routes[route.state.index].name
          : route.params?.screen || 'Home';
        
        switch (routeName) {
          case 'MainScreen':
            return 'Main';
          case 'OrdersScreen':
            return 'Orders';
          case 'AccountScreen':
              return 'Account';
        }
    }

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
                    <React.Fragment>
                        <Stack.Screen name="Home" component={bottomTab} options={({ route }) => ({
                        headerTitle: getHeaderTitle(route),
                        headerLeft: () => {
                            <Button
                                onPress={() => navigation.goBack()}
                                title="Go back"
                                color="lightblue"
                            />
                        },
                        headerRight: () => (
                            <Button
                                onPress={() => signOut()}
                                title="Sign Out"
                                color="lightblue"
                            />
                        ),
                      })}/>
                    </React.Fragment>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
