import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from './src/contexts/auth_context';

import HomeScreen from './src/screens/home';
import LoginScreen from './src/screens/login';
import WelcomeScreen from './src/screens/welcome'
import CreateAccountScreen from './src/screens/account/create_account'
import RestorePassScreen from './src/screens/restore_pass';
import SplashScreen from './src/screens/splash';

import { login, createAccount } from './src/api/authentication';
import { getToken, setToken, clearToken } from './src/api/token';


export default function App({ navigation }) {
    const Stack = createStackNavigator();

    const [state, dispatch] = React.useReducer(
      (prevState, action) => {
        switch (action.type) {
          case 'RESTORE_TOKEN':
            return {
              ...prevState,
              userToken: action.token,
              isLoading: false,
            };
          case 'SIGN_IN':
            return {
              ...prevState,
              isSignout: false,
              userToken: action.token,
            };
          case 'SIGN_OUT':
            return {
              ...prevState,
              isSignout: true,
              userToken: null,
            };
        }
      },
      {
        isLoading: true,
        isSignout: false,
        userToken: null,
      }
    );
  
    React.useEffect(() => {
      // Fetch the token from storage then navigate to our appropriate place
      const bootstrapAsync = async () => {
        let userToken;
  
        try {
          userToken = await getToken();
          console.log('useEffect', userToken)
        } catch (e) {
          // Restoring token failed
        }
  
        // After restoring token, we may need to validate it in production apps
  
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      };
  
      bootstrapAsync();
    }, []);
  
    const authContext = React.useMemo(
      () => ({
        signIn: async data => {
            const res = await login(data);
            await setToken(res.accessToken);
            dispatch({ type: 'SIGN_IN', token: res.accessToken });
            console.log('signin TOKEN:', state.userToken)
            // navigation.navigate('HomeScreen');
        },
        signOut: async () => {
            console.log('logout');
            await clearToken();
            dispatch({ type: 'SIGN_OUT' })
        },
        signUp: async data => {
            await createAccount(data);
            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
      }),
      []
    );

    React.useEffect(() => {
        console.log('useeff', state.userToken);
    }, [state.userToken])
  
    return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator
          initialRouteName='SplashScreen'
          >
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
            ) : !state.userToken ? (
              // No token found, user isn't signed in
              <React.Fragment>
                  <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{
                  title: 'Welcome',
              // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
                <Stack.Screen name="RestorePassScreen" component={RestorePassScreen} /> 
                <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
              </React.Fragment>
            ) : (
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
