import { useState, useEffect, useReducer } from 'react';
import './style.css';

//useReducer eh similar ao useState mas foi projetado para trabalhar com estados
//complexos (Ex. globalState, um objeto com varias chaves)

const globalState = {
    title: 'O titulo do contexto',
    conteudo: 'Conteudo do contexto',
    counter: 0,
};

//Funcao reducer recebe o estado Atual e retorna o novo estado
const myReducerFunction = (estadoAtual, action) => {
    switch (action.type) {
        case 'inverter': {
            console.log('chamou inverter');
            const { title } = estadoAtual;
            return { ...estadoAtual, title: title.split('').reverse().join('') };
        }
        case 'muda':
            console.log('chamou muda');
            return { ...estadoAtual, title: action.payload };
    }

    return { ...estadoAtual };
};

function Component_useReducer() {
    //No useReducer, a primeira coisa que devo passar eh uma funcao reducer e
    //a segunda coisa o estado inicial. A funcao "dispatch" serve para disparar
    //acoes
    const [estado, dispatch] = useReducer(myReducerFunction, globalState);
    const { title, body, counter } = estado;

    return (
        <div className="App">
            <h1>
                {title} - {counter}
            </h1>
            {
                //dispatch recebera sempre um objeto. Este objeto, eh comum que
                //tenhamos um "type" que informara o tipo da acao que estamos
                //disparando.
            }
            <button onClick={() => dispatch({ type: 'muda', payload: new Date().toLocaleDateString('pt-BR') })}>
                Muda Titulo
            </button>
            <button onClick={() => dispatch({ type: 'inverter' })}>Inverte Titulo</button>
        </div>
    );
}

export default Component_useReducer;
