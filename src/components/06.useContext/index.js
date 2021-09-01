import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import './style.css';

//== useContext eh uma especie de variavel global
//Quando o valor do ontexto eh alterado, os filhos
//recebem a alteracao
const globalState = {
    title: 'O titulo do contexto',
    conteudo: 'Conteudo do contexto',
    counter: 0,
};

const ContextoGlobal = React.createContext();

//== Criando componentes para simular uma arvore de componentes
//eslint-disable-next-line
const Div = () => {
    return (
        <>
            <H1 />
            <P />
        </>
    );
};

//eslint-disable-next-line
const H1 = () => {
    const Context = useContext(ContextoGlobal);
    const { contextState } = Context;
    //pegando valor do meu contexto global
    return <h1>{contextState.title}</h1>;
};

//eslint-disable-next-line
const P = () => {
    const Context = useContext(ContextoGlobal);
    const {
        contextState: { conteudo, counter },
        contextState,
        setContextState,
    } = Context;
    //pegando valor do meu contexto global
    return (
        <p onClick={() => setContextState({ ...contextState, counter: counter + 1 })}>
            {conteudo}&nbsp;
            {counter}
        </p>
    );
};

function Component_useContext() {
    const [contextState, setContextState] = useState(globalState);

    return (
        <ContextoGlobal.Provider value={{ contextState, setContextState }}>
            <Div />
        </ContextoGlobal.Provider>
    );
}

export default Component_useContext;
