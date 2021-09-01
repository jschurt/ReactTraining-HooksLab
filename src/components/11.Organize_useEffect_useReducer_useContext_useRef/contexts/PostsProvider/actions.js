import * as types from './types';

//dispatch vem do reducer. Lembrando, o dispatch altera o estado. Quando o
//estado eh alterado, ocorre uma nova renderizacao dos componentes que usam
//este estado. Logo, eu chamo o dispatch com o payload que sera usado para mudar
//o estado.
//Repare que sera retornada uma promise. ("Toda funcao async retorna uma promise")
export const loadPosts = async (dispatch) => {
    dispatch({ type: types.POSTS_LOADING });

    //Simulando uma demora na resposta do servico rest
    //setTimeout(async () => {
    const postsRaw = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await postsRaw.json();

    //Ao inves de eu disparar o reducer que os dados foram carregados,
    //vou retornar o dispach. desta forma, quem chamar esta acao eh que
    //sera responsavel por disparar o dispach (consequentemente o reducer)
    //ou nao.
    return () => dispatch({ type: types.POSTS_SUCCESS, payload: posts });
    //}, 5000);
};
