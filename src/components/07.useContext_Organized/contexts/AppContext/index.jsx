import { createContext, useState } from 'react';
import { globalStateData } from './data.js';

export const myContextGlobal = createContext();

//eslint-disable-next-line
export const AppContext = ({ children }) => {
    const [estado, setEstado] = useState(globalStateData);

    return <myContextGlobal.Provider value={{ estado, setEstado }}>{children}</myContextGlobal.Provider>;
};
