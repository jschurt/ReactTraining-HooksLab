import { useState, useEffect, useReducer, createContext, useContext, useRef } from 'react';
import './style.css';
import P from 'prop-types';

//useReducer eh similar ao useState mas foi projetado para trabalhar com estados
//complexos (Ex. globalState, um objeto com varias chaves)

//--- data.js (estou colocando export pois assim seria se estivesse em outro arquivo)
export const globalState = {
    title: 'O titulo do contexto',
    conteudo: 'Conteudo do contexto',
    counter: 0,
};
//-----------------------------

//--- reducer.js (estou colocando export pois assim seria se estivesse em outro arquivo)
export const myReducer = (estado, action) => {
    switch (action.type) {
        case actions.CHANGE_TITLE: {
            return { ...estado, title: action.payload };
        }
    }

    return { ...estado };
};

//-----------------------------

// --- actions.js ----------
export const actions = {
    CHANGE_TITLE: 'CHANGE_TITLE',
};

//-----------------------------

// --- appContext.jsx ----------
export const myContext = createContext();

export const AppContext = ({ children }) => {
    const [estado, dispatch] = useReducer(myReducer, globalState);

    const changeTitle = (novoTitulo) => {
        dispatch({ type: actions.CHANGE_TITLE, payload: novoTitulo });
    };

    return <myContext.Provider value={{ estado, changeTitle }}>{children}</myContext.Provider>;
};

AppContext.propTypes = {
    children: P.node,
};

//-----------------------------

// --- H1 / index.jsx ----------
export const H1 = () => {
    const _myContext = useContext(myContext);
    const inputRef = useRef();

    console.log(_myContext);
    return (
        <>
            <h1 onClick={() => _myContext.changeTitle(inputRef.current.value)}>{_myContext.estado.title}</h1>
            <input type="text" name="titulo" id="titulo" ref={inputRef} />
        </>
    );
};
//-----------------------------

function Component_useReducer_useContext() {
    return (
        <AppContext>
            <div className="App">
                <H1></H1>
            </div>
        </AppContext>
    );
}

export default Component_useReducer_useContext;
