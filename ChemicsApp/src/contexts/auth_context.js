import React from 'react';

import { login, createAccount, restorePass } from '../api/auth/authentication';
import { getToken, clearToken } from '../async_storage/token';
import { saveUser, removeUser } from '../async_storage/user';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
                isRestore: action.pass
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
                isRestore: false
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                userToken: null,
                isRestore: false
              };
          }
        },
        {
          isLoading: true,
          isSignout: false,
          userToken: null,
          isRestore: false
        }
      );

    // after component mounted, check whether token is present & set state
    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;
            
            try {
                userToken = await getToken();
            } catch (e) {
                console.error("Restoring token failed!");
            }

            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
        
        bootstrapAsync();
    }, []);

    const actions = {
        signIn: async data => {
            try {
                const res = await login(data);
                await saveUser(res);
                dispatch({ type: 'SIGN_IN', token: res.accessToken });
            } catch (err) {
                console.error(err);
            }
        },
        signOut: async () => {
            await removeUser();
            dispatch({ type: 'SIGN_OUT' })
        },
        restore: async data => { 
            try {
                const res = await restorePass(data);
                dispatch({ type: 'RESTORE_TOKEN', token: undefined, pass: res.pass });
            } catch (err) {
                console.error(err);
            }
        },
        create: async data => {
            try {
                const res = await createAccount(data);
                dispatch({ type: 'RESTORE_TOKEN', token: undefined });
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <AuthContext.Provider value={{actions, state}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext };
