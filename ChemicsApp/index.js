/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import React from 'react';
import { AuthProvider} from './src/contexts/auth_context';
import { DryProvider } from './src/contexts/dry.context';

AppRegistry.registerComponent(appName, () => (
    () => (
        <AuthProvider>
            <DryProvider>
                <App/>
            </DryProvider>
        </AuthProvider>
    ))
);