import './style.css';
import P from 'prop-types';
import { forwardRef, useCallback, useEffect, useRef, useState, useImperativeHandle, useDebugValue } from 'react';

//===== Custom Hook ===================================
export const useMediaQuery = (queryValue, initialValue = false) => {
    const [match, setMatch] = useState(initialValue);

    //Este valor ira aparecer em inspect -> Components
    useDebugValue('qualquer coisa');
    useDebugValue('qualquer coisa 2');

    //O useEffect na primeira execucao ira rodar o codigo abaixo.
    //Quando o parametro "queryValue" mudar, tb sera disparado
    //o effect.
    useEffect(() => {
        //Flag para saber se o componente ainda esta
        //montado antes de alterar o estado...
        let isMounted = true;

        //isto eh javascript/DOM puro
        const matchMedia = window.matchMedia(queryValue);

        const handleChange = () => {
            if (!isMounted) return;
            setMatch(matchMedia.matches);
        };

        matchMedia.addEventListener('change', handleChange);
        setMatch(matchMedia.matches);

        //cleanup, funcao que eh executada qdo o componente desmonta
        return () => {
            isMounted = false;
            matchMedia.removeEventListener('change', handleChange);
        };
    }, [queryValue]);

    //Retorno do hook
    return match;
};
//=====================================================

function Component_useDebugValue() {
    //chamando meu hook
    const huge = useMediaQuery('(min-width: 980px)');
    const big = useMediaQuery('(max-width: 979px) and (min-width: 768px)');
    const medium = useMediaQuery('(max-width: 767px) and (min-width: 321px)');
    const small = useMediaQuery('(max-width: 320px)');
    const background = huge ? 'green' : big ? 'red' : medium ? 'yellow' : small ? 'purple' : null;

    return <div style={{ fontSize: '60px', background }}>Oi</div>;
}

export default Component_useDebugValue;
