import { useState, useEffect, useReducer, createContext, useContext, useRef } from 'react';
import './style.css';
import P from 'prop-types';

const useMyHook = (cb, delay = 1000) => {
    console.log('chamei my Hook');

    const savedCallBack = useRef();

    useEffect(() => {
        savedCallBack.current = cb;
    }, [cb]);

    //componentDIDMount - executa somente quando o componente
    //eh montado, isto eh, executa apenas uma vez (passar array de
    //dependencias vazio)
    useEffect(() => {
        const interval = setInterval(() => {
            savedCallBack.current();
        }, delay);

        //Limpando lixo para evitar a criacao ininterrupta de novos "interval"
        return () => clearInterval(interval);
    }, [delay]);
};

function Component_CustomHook() {
    const [counter, setCounter] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [incrementor, setIncrementor] = useState(100);
    //repare que a chamada do meu hook esta sendo chamado toda hora que o
    //componente for renderizado.
    useMyHook(() => setCounter((c) => c + 1), delay);
    return (
        <div className="App">
            <h1>Contador: {counter}</h1>
            <h1>Delay: {delay / 1000} s</h1>
            <button
                onClick={() => {
                    setDelay((d) => d + incrementor);
                }}
            >
                +{incrementor}
            </button>
            <button
                onClick={() => {
                    setDelay((d) => d - incrementor);
                }}
            >
                -{incrementor}
            </button>
            <br />
            <input type="number" value={incrementor} onChange={(e) => setIncrementor(e.target.value)} />
        </div>
    );
}

export default Component_CustomHook;
