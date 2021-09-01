import { useEffect, useRef, useState } from 'react';

const isObjectEqual = (objA, objB) => {
    return JSON.stringify(objA) === JSON.stringify(objB);
};

//Criando hook para carregar dados para mim. "url" pode ser uma url ou um
//objeto de request e "options" sera um objeto
export const useFetch = (url, options) => {
    const [resultado, setResultado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    //Quando uso "useRef", ele cria uma referencia em memoria e nao atualiza
    //esta referencia entre as renderizacoes do componente.
    const urlRef = useRef(url);
    const optionsRef = useRef(options);

    console.log('Meu hook funciona');

    useEffect(() => {
        let change = false;

        if (!isObjectEqual(url, urlRef.current)) {
            console.log('mudei url ', url, ' ', urlRef.current);
            urlRef.current = url;
            change = true;
        }
        if (!isObjectEqual(options, optionsRef.current)) {
            console.log('mudei options ', options, ' ', optionsRef.current);
            optionsRef.current = options;
            change = true;
        }
        if (change) setShouldLoad((c) => !c);
    }, [url, options]);

    useEffect(
        () => {
            //A variavel "wait" aqui eh uma flag que ira indicar
            //se o resultado do fetch devera mudar o estado ou nao
            //(usando setResultado e setLoading). Pq isto eh importante?
            //Como fatch eh assincrono, pode ocorrer de haver uma requisicao
            //e antes de receber a resposta o usuario clicar para desmontar
            //a pagina (indo para outra pagina). Neste caso, ao receber a
            //resposta, nao deveria chamar as funcoes setResultado e setLoading.
            //Sendo assim, podemos setar "wait = true" no retorno do "useEffect"
            //o retorno de useEffect eh executado qdo o componente eh desmontado.
            //Sendo assim, uma vez desmontado, qdo fetch terminar sua execucao,
            //"wait" sera true, e setResultado/setLoading nao serao executados.
            let wait = false;
            //usando controller, podemos abortar uma requisicao.
            const controller = new AbortController();
            const signal = controller.signal;

            console.log('EFFECT', new Date().toLocaleString());
            console.log(optionsRef.current.headers);

            setLoading(true);

            const fetchData = async () => {
                //Apenas para demorar um pouco para retornar o resultado.
                //Como a funcao eh "async" e sabendo que "Toda funcao async retorna
                //uma promise"
                await new Promise((r) => setTimeout(r, 3000));

                try {
                    const responseRaw = await fetch(urlRef.current, { signal, ...optionsRef.current });
                    const jsonResult = await responseRaw.json();

                    if (!wait) {
                        setResultado(jsonResult);
                        setLoading(false);
                    }
                } catch (e) {
                    if (!wait) setLoading(false);
                    console.log(e);
                }
            };

            fetchData();

            //Quando o componente desmontar
            return () => {
                wait = true;
                //utilizando controller.abort, podemos cancelar a
                //conexao do fetch. Isto era gerar uma excecao.
                controller.abort();
            };
        },
        //usando useRef, eu deixo de ter dependencias.
        [shouldLoad] /*[url, options]*/,
    );

    //[result, loading]
    return [resultado, loading];
};
