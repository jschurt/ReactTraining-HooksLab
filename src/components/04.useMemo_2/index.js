import P from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './style.css';

//==Criando componente no mesmo arquivo apenas para facilitar =================
const Post = ({ post }) => {
    return (
        <div className="post">
            <h2>{post.title}</h2>
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
};

function Component_useMemo2() {
    const [posts, setPosts] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    console.log('pai renderizou');

    //Component did mount (UseEffect com array de dependencias vazio)
    useEffect(() => {
        setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then((response) => response.json())
                .then((response) => {
                    setPosts(response);
                    console.log('dentro then', posts);
                });
            console.log('fora then', posts);
        }, 5000);
    }, []);

    return (
        <div className="App">
            <h1>test useMemo</h1>
            <input type="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

            {useMemo(() => {
                return (
                    posts.length > 0 &&
                    posts.map((post) => {
                        return <Post key={post.id} post={post} />;
                    })
                );
            }, [posts])}

            {posts.length == 0 && <p>Carregando posts</p>}
        </div>
    );
}

export default Component_useMemo2;
