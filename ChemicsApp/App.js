import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './src/screens/home';
import LoginScreen from './src/screens/login';
import WelcomeScreen from './src/screens/welcome'
import CreateAccountScreen from './src/screens/account/create_account'

const AppNavigator = createStackNavigator(
    {
        Login: LoginScreen,
        Home: HomeScreen,
        Welcome: WelcomeScreen,
        CreateAccount: CreateAccountScreen
    },
    {
        initialRouteName: 'Welcome'
    }
)
    
export default createAppContainer(AppNavigator);