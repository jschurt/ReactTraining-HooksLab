import './style.css';
import P from 'prop-types';
import { forwardRef, useCallback, useEffect, useRef, useState, useImperativeHandle } from 'react';

//useImperativeRef eh uma form de passar um objeto pelo "ref"
//do objeto filho para o objeto pai (mas nao eh recomendavel)

//===================
//Simulando componente externo.
//Se eu quero chamar um componente passando "ref", preciso
//chamar este componente dentro de "forwardRef". A funcao
//NAO PODE SER ARROW (exige um "display name")
export const DisplayCounted = forwardRef(function Qqcoisa({ counted }, ref) {
    const [rand, setRand] = useState(0.24);
    const divRef = useRef();

    const handleClickChild = () => {
        setRand(Math.random().toFixed(2));
    };

    //Eu uso "useImperativeHandler" quando quero passar de
    //volta para o pai algum objeto complexo href (no caso)
    //quero passar a funcao "handleClick"
    useImperativeHandle(ref, () => {
        return { handleClickChild, divRef: divRef.current };
    });

    return (
        <div>
            <div ref={divRef} style={{ height: '150px', width: '100px', overflowY: 'auto' }}>
                {counted.map((c) => {
                    return (
                        <p key={c} onClick={handleClickChild}>
                            {c} ({rand})
                        </p>
                    );
                })}
            </div>
        </div>
    );
});

DisplayCounted.propTypes = {
    counted: P.array,
};

//===================

//hook useImperativeHandle dificilmente sera usado.
//Personaliza o valor da instancia que esta exposta aos
//componentes "pai" ao usar "refs"

function Component_useImperativeHandle() {
    const [counted, setCounted] = useState([0, 1, 2, 3]);
    const childRef = useRef();

    const handleClick = () => {
        setCounted((c) => [...c, +c.slice(-1) + 1]);
        childRef.current.handleClickChild();
    };

    useEffect(() => {
        //Como estou usando "useImperativeHandle" no compoonente
        //filho, divRef.current nao retorna o elemento da DOM, e sim
        //um objeto complexo (no caso com "handleClick" e "divRef")
        console.log(childRef.current);
        childRef.current.divRef.scrollTop = childRef.current.divRef.scrollHeight;
    });

    return (
        <div>
            <pre>Imperative</pre>
            <button onClick={handleClick}>Count {counted.slice(-1)}</button>
            <DisplayCounted counted={counted} ref={childRef} />
        </div>
    );
}

export default Component_useImperativeHandle;
