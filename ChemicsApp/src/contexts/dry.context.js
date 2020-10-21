import React, { useState, useEffect } from 'react';

import { getDries } from '../api/dry';

const DryContext = React.createContext();

const DryProvider = (props) => {
    const [dries, setDries] = useState([]);
    
    const actions = {
        getDries: async () => {
            return await getDries();
        }
    }

    return (
        <DryContext.Provider value={{actions, dries, setDries}}>
            { props.children }
        </DryContext.Provider>
    )
}

export { DryProvider, DryContext };
