import React, { useState, useEffect } from 'react';

import { getAllServices } from '../api/services';
import { getUser } from '../async_storage/user'; 

const MoneyContext = React.createContext();

const MoneyProvider = ({children}) => {
    const [money, setMoney] = useState([]);
    
    const actions = {
    }

    React.useEffect(() => {
    }, [])

    return (
        <MoneyContext.Provider value={{ actions, money, setMoney }}>
            {children}
        </MoneyContext.Provider>
    )
}

export { MoneyProvider, MoneyContext };
