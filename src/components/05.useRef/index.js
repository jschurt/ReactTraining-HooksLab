import P from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './style.css';

//== Neste componente, se eu clicar no titulo de um post, este titulo ira
//sera copiado para o input

//==Criando componente no mesmo arquivo apenas para facilitar =================
const Post = ({ post, onTitleClick }) => {
    return (
        <div className="post">
            <h2 onClick={() => onTitleClick(post.title)}>{post.title}</h2>
            <p>{post.body}</p>
            <hr />
        </div>
    );
};

Post.propTypes = {
    post: P.shape({
        id: P.number,
        title: P.string,
        body: P.string,
    }),
    onTitleClick: P.func,
};

function Component_useRef() {
    const [posts, setPosts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    //Criando uma referencia para algum controle. No caso, no elemento input
    //adicionamos o atributo ref={input}
    const refInput = useRef(null);
    //posso tambem criar um ref para um valor
    const refContador = useRef(0);

    console.log('pai renderizou');

    //Component did mount (UseEffect com array de dependencias vazio)
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((response) => {
                setPosts(response);
                console.log('dentro then', posts);
            });
        console.log('fora then', posts);
    }, []);

    const handleTitleClick = (value) => {
        setSearchValue(value);
    };

    //useEffect, com referencias, indica que sempre que a referencia mudar,
    //o codigo do useEffect sera alterado. Entao sempre que "searchValue"
    //for alterado (e ele eh alterado a cada digitacao) useEffect sera executado.
    useEffect(() => {
        //tef.input retorna o elemento HTML. eu SEMPRE usarei "current"
        console.log(refInput.current);
        //Dando o foco ao input
        refInput.current.focus();
    }, [searchValue]);

    //Executar toda vez que o elemento pai renderizar. (useEffect sem referencias
    //eh executado sempre que o componente for renderizado)
    useEffect(() => {
        refContador.current++;
    });

    return (
        <div className="App">
            <h1>Renderizou: {refContador.current}x</h1>
            <input ref={refInput} type="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

            {useMemo(() => {
                return (
                    posts.length > 0 &&
                    posts.map((post) => {
                        return <Post key={post.id} post={post} onTitleClick={handleTitleClick} />;
                    })
                );
            }, [posts])}

            {posts.length == 0 && <p>Carregando posts</p>}
        </div>
    );
}

export default Component_useRef;
