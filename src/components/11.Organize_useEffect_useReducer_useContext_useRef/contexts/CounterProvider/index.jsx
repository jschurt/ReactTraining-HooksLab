import { CounterContext } from './context';
import P from 'prop-types';
import { useReducer } from 'react';
import { myReducer_CounterProvider } from './reducer';
import { dataCounter } from './data';

export const CounterProvider = ({ children }) => {
    const [counterEstado, counterDispatch] = useReducer(myReducer_CounterProvider, dataCounter);

    return <CounterContext.Provider value={{ counterEstado, counterDispatch }}>{children}</CounterContext.Provider>;
};

CounterProvider.propTypes = {
    children: P.node.isRequired,
};
