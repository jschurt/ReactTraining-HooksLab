import * as types from './types';

//O trabalho do reducer (que sera chamado pelas acoes) eh simplesmente mudar o
//estado. Mudando o estado, os componentes que utilizam este estado serao
//renderizados.

export const myReducer = (estado, action) => {
    switch (action.type) {
        case types.POSTS_SUCCESS:
            console.log(action.type);
            return { ...estado, posts: action.payload, loading: false };

        case types.POSTS_LOADING:
            console.log(action.type);
            return { ...estado, loading: true };
    }

    console.log('Nao encontrei esta action ', action.type);
    return { ...estado };
};
