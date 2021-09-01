import { useContext } from 'react';
import { myContextGlobal } from '../../contexts/AppContext/index.jsx';

export const H1 = () => {
    const Context = useContext(myContextGlobal);
    const { estado } = Context;
    //pegando valor do meu contexto global
    return <h1>{estado.title}</h1>;
};
