import P from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import './style.css';

//Toda vez que o componente pai renderiza, o componente filho ira renderizar
//usando no componente pai o hook "useMemo", estaremos fazendo o cache do
//componente
const Button = ({ handleClick }) => {
    console.log('Renderizando botao');
    return <button onClick={() => handleClick(10)}>Increment</button>;
};

Button.propTypes = {
    handleClick: P.func,
};

//hook useCallback eh normalmente utilizado em otimizacoes. A grosso modo,
//serve para "salvar" funcoes, fazendo com que ela nao seja "recriada" toda
//ver que o componente for renderizado.
function Component_useMemo() {
    const [counter, setCounter] = useState(0);

    //Criando funcao sem "callback". Neste caso, a funcao sera recriada
    //toda vez que o componente for renderizado, e desta forma, o componente
    //"Button" sera renderizado novamente
    /*
    const incrementCounter = (val) => {
        setCounter((actualCounter) => actualCounter + val);
    };
    */
    //useCallback(fn, [arrayDependencias])
    //use callBack salva a sua funcao, e soh ira recria-la quando
    //a dependencia ([arrayDependencias]) mudar. Sendo salva, a funcao
    //nao sera recriada e o componente Button (que esta em Cache) nao sera
    //recriado.
    const incrementCounter = useCallback((val) => {
        //se eu tentar chamar, setCounter(counter+ val)
        //terei que colocar counter no array de dependencias.
        //como counter ira sempre mudar, a funcao sera sempre recriada
        //e nao sera utilizada a funcao em cache. Por isso, devemos
        //utilizae a arrow function.
        setCounter((actualCounter) => actualCounter + val);
    }, []);

    console.log('chamou pai (component)');

    return (
        <div className="App">
            <h1>Contador: {counter}</h1>
            {
                //Fazendo o cache do componente, que apenas sera renderizado
                //se a dependencia mudar
                useMemo(
                    () => (
                        <Button handleClick={incrementCounter} />
                    ),
                    [incrementCounter],
                )
            }
        </div>
    );
}

export default Component_useMemo;
