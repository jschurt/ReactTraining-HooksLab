import './style.css';
import P from 'prop-types';
import { useEffect, useState } from 'react';
import { useFetch } from './use-fetch';

function Component_CustomHook_FetchApi() {
    const [postId, setPostId] = useState('');
    const [result, loading] = useFetch('https://jsonplaceholder.typicode.com/posts/' + postId, {
        method: 'GET',
        headers: { abc: '1' + postId },
    });

    useEffect(() => {
        console.log('ID do post', postId);
    }, [postId]);

    const handleClick = (id) => {
        setPostId(id);
    };

    if (loading) {
        console.log('loading...', loading);
        return <p>Loading...</p>;
    }

    if (!loading && result) {
        console.log(result);
        return (
            <div>
                {result?.length > 0 ? (
                    result.map((post) => (
                        <div key={post.id} onClick={() => handleClick(post.id)}>
                            <p>{post.title}</p>
                        </div>
                    ))
                ) : (
                    <div key={result.id} onClick={() => handleClick('')}>
                        <p>{result.title}</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="App">
            <h1>Oi</h1>
        </div>
    );
}

export default Component_CustomHook_FetchApi;
