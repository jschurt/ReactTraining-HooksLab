import './style.css';
import P from 'prop-types';
import {
    forwardRef,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    useImperativeHandle,
    useDebugValue,
} from 'react';

//== Componente ===========================================================
export const MyComponent = () => {
    console.log(`%cCHILD RENDER STARTING...`, 'color: green');

    //Lazy Initializer: ao inves de passar um valor em "useState", eu uso uma
    //funcao
    const [state1, setState1] = useState(() => {
        const state = new Date().toLocaleString();
        console.log(`%cState Lazy Initializer - useState(InitialValue) = ${state}`, 'color: green');
        return state;
    });

    const renders = useRef(0);

    //useEffect com dependencias vazias eh executado APENAS NA PRIMEIRA RENDERIZACAO
    useEffect(() => {
        console.log('%cuseEffect -> Empty dependencies', 'color: #dbc70f');

        return () => {
            console.log('%cuseEffect (cleanup) -> Empty dependencies', 'color: #dbc70f');
        };
    }, []);

    //Sera executado a cada mudanca no componente
    useEffect(() => {
        console.log('%cuseEffect -> No dependencies', 'color: #dbc70f');
        renders.current += 1;

        return () => {
            console.log('%cuseEffect (cleanup) -> No dependencies', 'color: #dbc70f');
        };
    });

    //useLayoutEffect eh executado antes dos useEffect
    useLayoutEffect(() => {
        console.log('%cuseLayoutEffect', 'color: #e61a4d');

        return () => {
            console.log('%cuseLayoutEffect (cleanup)', 'color: #e61a4d');
        };
    });

    useEffect(() => {
        console.log('%cuseEffect -> (UPDATE state1) ' + state1, 'color: #dbc70f');
        renders.current += 1;

        return () => {
            console.log('%cuseEffect (cleanup) -> (UPDATE state1)', 'color: #dbc70f');
        };
    }, [state1]);

    console.log(`%cCHILD RENDER ${renders.current} ENDING..`, 'color: green');

    return (
        <div
            onClick={() => {
                setState1(new Date().toLocaleString('pt-br'));
            }}
            style={{ fontSize: '30px' }}
        >
            State: {state1}
        </div>
    );
};
//=========================================================================

function Component_hookExecutionOrder() {
    //renders eh um contador para o numero de renderizacoes. Pq usar "useRef",
    //com "useRef" eu nao perco o valor durante as renderizacoes.
    const renders = useRef(0);

    //A cada atualizacao do componente, o codigo abaixo sera executado
    useEffect(() => {
        renders.current += 1;
    });

    console.log(`%cPARENT RENDER ${renders.current} STARTING...`, 'color: green');
    const [show, setShow] = useState(false);
    console.log(`%cState Initializer  - useState(InitialValue) = ${show}`, 'color: green');
    console.log(`%cPARENT RENDER ${renders.current} ENDING...`, 'color: green');

    return (
        <div>
            <p style={{ fontSize: '30px' }} onClick={() => setShow((s) => !s)}>
                Show Hooks
            </p>
            {
                //Componente filho soh sera exibido (montado) quando eu clicar no paragrafo
            }
            {show && <MyComponent />}
        </div>
    );
}

export default Component_hookExecutionOrder;
