/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import React from 'react';
import { AuthProvider} from './src/contexts/auth_context';
import { DryProvider } from './src/contexts/dry.context';
import { OrderProvider } from './src/contexts/order.context'
import { ServiceProvider } from './src/contexts/service.context';
import { MoneyProvider } from './src/contexts/money.context';

AppRegistry.registerComponent(appName, () => (
    () => (
        <AuthProvider>
            <DryProvider>
                <ServiceProvider>
                    <OrderProvider>
                        <MoneyProvider>
                            <App/>
                        </MoneyProvider>
                    </OrderProvider>
                </ServiceProvider>
            </DryProvider>
        </AuthProvider>
    ))
);