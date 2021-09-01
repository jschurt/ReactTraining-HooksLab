import { useContext, useEffect, useRef } from 'react';
import { decrementCounter, incrementCounter } from '../../contexts/CounterProvider/action';
import { CounterContext } from '../../contexts/CounterProvider/context';
import { loadPosts } from '../../contexts/PostsProvider/actions';
import { PostsContext } from '../../contexts/PostsProvider/context';

export const Posts = () => {
    //Flag para indicar se o componente esta montado ou nao.
    //Irei disparar o dispach da acao loadingPosts apenas se o compoonente
    //estiver montado na tela. caso nao esteja (se por acaso o usuario clicou
    //em outra opcao no menu), nao irei executar o reducer (que iria mudar o
    //estado).
    //Uso useRef (pq useRef ira lembrar)
    const isMounted = useRef(true);
    const postsContext = useContext(PostsContext);
    const { postsEstado, postsDispatch } = postsContext;

    const counterContext = useContext(CounterContext);
    const { counterEstado, counterDispatch } = counterContext;

    console.log(isMounted.current);

    //Chamada ingenua pois nunca limpo a chamada. Se eu estiver carregando os
    //dados e clicar num link para ir para outra parte da aplicacao, os posts
    //ainda serao carregados, seus reducers executados, etc.. Devo entao adicionar
    //a flag "isMounted" para chamar o reducer apenas se o componente estiver
    //montado.
    useEffect(() => {
        console.log('carregue os posts');
        //pq loadPosts recebe dispatch? Pq ele precisa disparar
        //os eventos (tratados no reducer).
        loadPosts(postsDispatch).then((dispatch) => {
            if (isMounted.current) {
                dispatch();
            }
        });

        //A funcao que eh retornada abaixo sera executada qdo o componente
        //for desmontado
        return () => {
            isMounted.current = false;
            console.log(isMounted.current);
        };
    }, [postsDispatch]);

    return (
        <div>
            <div>{counterEstado.counter}</div>
            <button
                onClick={() => {
                    incrementCounter(counterDispatch);
                }}
            >
                Incrementa
            </button>
            <button
                onClick={() => {
                    decrementCounter(counterDispatch);
                }}
            >
                Decrementa
            </button>

            <h1>Posts</h1>
            {postsEstado.loading && (
                <p>
                    <strong>Carregando posts...</strong>
                </p>
            )}
            {postsEstado.posts.map((post) => (
                <p key={post.id}>{post.title}</p>
            ))}
        </div>
    );
};
