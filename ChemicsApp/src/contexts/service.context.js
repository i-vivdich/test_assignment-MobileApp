import React, { useState, useEffect } from 'react';

import { getAllServices } from '../api/services';
import { getUser } from '../async_storage/user'; 

const ServiceContext = React.createContext();

const ServiceProvider = ({children}) => {
    const [services, setServices] = useState([]);

    const actions = {
        getServices: async () => {
            const user = await getUser();
            if (user) {
                setServices(await getAllServices());
            }
        }
    }

    React.useEffect(() => {
        actions.getServices();
    }, [])

    return (
        <ServiceContext.Provider value={{ services, setServices, actions }}>
            { children }
        </ServiceContext.Provider>
    )
}

export { ServiceProvider, ServiceContext };
