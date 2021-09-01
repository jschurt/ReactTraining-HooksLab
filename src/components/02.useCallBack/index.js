import P from 'prop-types';
import React, { useCallback, useState } from 'react';
import './style.css';

//Usando React.memo, eu crio uma especie de "cache" para a minha funcao
//Se ao necessitar renderizar novamente esta funcao, ela nao tiver sofrido
//mudancas, a funcao nao sera renderizada novamente. (Mudancas de estado)
//Logo, se ao chamar este componente, a propriedade "handleClick" for diferente
//daquela armazendada no "cache", a funcao sera recriada.
//Obs. Nao posso colocar uma arrow nem anonymous function aqui
const Button = React.memo(function Button({ handleClick }) {
    console.log('Renderizando botao');
    return <button onClick={() => handleClick(10)}>Increment</button>;
});

Button.propTypes = {
    handleClick: P.func,
};

//hook useCallback eh normalmente utilizado em otimizacoes. A grosso modo,
//serve para "salvar" funcoes, fazendo com que ela nao seja "recriada" toda
//ver que o componente for renderizado.
function Component_useCallback() {
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
            <Button handleClick={incrementCounter} />
        </div>
    );
}

export default Component_useCallback;
