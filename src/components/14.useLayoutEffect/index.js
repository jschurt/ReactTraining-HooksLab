import './style.css';
import P from 'prop-types';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

//useLayoutEffect dificilmente eh usado e eh muito parecido
//com use effect, soh que eh chamado em momento diferente, sendo
//disparado apos todas as alteracoes no DOM.
//Compare useEffect e useLayoutEffect rodando a aplicacao e
//comentando/descomentando-os intercaladamente.
function Component_useLayoutEffect() {
    const [counted, setCounted] = useState([0, 1, 2, 3]);
    const divRef = useRef();

    const handleClick = () => {
        setCounted((c) => [...c, +c.slice(-1) + 1]);
    };

    /*
    useEffect(() => {
        const now = Date.now();
        while (Date.now() < now + 3000);
        //divRef.current ja retorna o elemento da DOM, que
        //pode ser usado com javascript puro
        divRef.current.scrollTop = divRef.current.scrollHeight;
    });
*/

    useLayoutEffect(() => {
        const now = Date.now();
        while (Date.now() < now + 3000);
        //divRef.current ja retorna o elemento da DOM, que
        //pode ser usado com javascript puro
        divRef.current.scrollTop = divRef.current.scrollHeight;
    });

    return (
        <div>
            <button onClick={handleClick}>Count {counted.slice(-1)}</button>
            <div ref={divRef} style={{ height: '150px', width: '100px', overflowY: 'auto' }}>
                {counted.map((c) => {
                    return <p key={c}>{c}</p>;
                })}
            </div>
        </div>
    );
}

export default Component_useLayoutEffect;
