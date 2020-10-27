import React, { useState, useEffect } from 'react';

import { getOrders, getAllOrders } from '../api/orders';
import { getAllServices } from '../api/services';
import { getUser } from '../async_storage/user'; 

const OrderContext = React.createContext();

const OrderProvider = ({children}) => {
    const [orders, setOrders] = useState([]);
    
    const actions = {
        getOrders: async () => {
            const user = await getUser();
            if (user) {
                setOrders(await getOrders(user.id));
            }
        },
        getAllOrders: async () => {
            setOrders(await getAllOrders());
        }
    }

    React.useEffect(() => {
        actions.getOrders();
    }, [])

    return (
        <OrderContext.Provider value={{ actions, orders, setOrders }}>
            {children}
        </OrderContext.Provider>
    )
}

export { OrderProvider, OrderContext };
