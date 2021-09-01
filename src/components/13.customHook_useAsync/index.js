import './style.css';
import P from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

const useAsync = (asyncFn, shouldExecute) => {
    //O estado servira a quem usa este hook tomar alguma acao
    //de acordo com o estado
    const [estado, setEstado] = useState({ result: null, error: null, status: 'idle' });

    const run = useCallback(() => {
        //Se houver um previo result ou erro, devo limpar
        setEstado({ result: null, error: null, status: 'pending' });
        return asyncFn()
            .then((response) => {
                setEstado({ result: response, error: null, status: 'settled' });
            })
            .catch((err) => {
                setEstado({ result: null, error: err, status: 'error' });
            });
    }, [asyncFn]);

    //Se eu troco a funcao ou shouldEffect, executo useEffet
    useEffect(() => {
        if (shouldExecute) run();
    }, [shouldExecute, run]);

    return [run, estado.result, estado.error, estado.status];
};

//Declarando funcao para coletar dados, que sera usadao no hook useAsync.
const fetchData = async () => {
    //simulando erro
    //throw new Error('ops. aconteceu um erro');

    //await apenas para demorar um pouco na execucao do fetch
    await new Promise((r) => setTimeout(r, 2000));

    const data = await fetch('https://jsonplaceholder.typicode.com/posts/');
    const dataJson = await data.json();
    return dataJson;
};

function Component_CustomHook_useAsync() {
    const [posts, setPosts] = useState(null);
    const [reFetchData, result, error, status] = useAsync(fetchData, true);

    if (status === 'idle') {
        return <pre>Nada executando</pre>;
    }

    if (status === 'pending') {
        return <pre>Loading</pre>;
    }

    if (status === 'error') {
        return <pre>{error.message}</pre>;
    }

    if (status === 'settled') {
        return (
            <pre
                onClick={() => {
                    alert('Vou recarregar...');
                    reFetchData();
                }}
            >
                {JSON.stringify(result, null, 2)}
            </pre>
        );
    }

    return (
        <div>
            <pre>...</pre>
        </div>
    );
}

export default Component_CustomHook_useAsync;
