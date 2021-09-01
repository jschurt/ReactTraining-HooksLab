import { useContext } from 'react';
import { myContextGlobal } from '../../contexts/AppContext/index.jsx';

export const P = () => {
    const Context = useContext(myContextGlobal);
    const {
        estado: { conteudo, counter },
        estado,
        setEstado,
    } = Context;
    //pegando valor do meu contexto global
    return (
        <p onClick={() => setEstado({ ...estado, counter: counter + 1 })}>
            {conteudo}&nbsp;
            {counter}
        </p>
    );
};
