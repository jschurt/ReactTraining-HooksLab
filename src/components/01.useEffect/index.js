import { useState, useEffect } from 'react';
import './style.css';

function Component_useEffect() {
    const [counter, setCounter] = useState(0);

    const handleH1Click = () => console.log('h1 clicado');

    //componentDIDUpdate - executa toda vez que o componente
    //atualiza (nao passar array de dependencias)
    useEffect(() => {
        console.warn('====> componentDidUpdate');
    });

    //componentDIDMount - executa somente quando o componente
    //eh montado, isto eh, executa apenas uma vez (passar array de
    //dependencias vazio)
    useEffect(() => {
        console.warn('====> componentDidMount');

        document.querySelector('h1')?.addEventListener('click', handleH1Click);

        //componentWillUnmount - limpeza!!
        //O return aqui, serve para limpar os recursos que montei. Se eu nao
        //fizer isto toda vez que eu montar o componente, estarei adicionando
        //novamente o eventListener, fazendo com que ele seja executado multiplas
        //vezes
        return () => {
            document.querySelector('h1')?.removeEventListener('click', handleH1Click);
        };
    }, []);

    //Com dependencia - executa toda vez que a dependencia mudar
    useEffect(() => {
        console.warn('====> contador mudou para', counter);

        //NAO ATUALIZAR counter usando o estado atual, pois se o
        //fizer irei criar um loop infinito
        //setCounter(counter+1); // <==== LOOP
        //porem o comando abaixo eh valido por nao usar o estado
        //atual
        //setCounter(10);
    }, [counter]);

    return (
        <div className="App">
            <h1>- Contador: {counter}</h1>
            <button onClick={() => setCounter(counter + 1)}>Increment Counter</button>
        </div>
    );
}

export default Component_useEffect;
