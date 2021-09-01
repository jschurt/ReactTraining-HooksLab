import './style.css';
import P from 'prop-types';
import {
    forwardRef,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    useImperativeHandle,
    useDebugValue,
    Component,
} from 'react';

//Error Boundaries limita o erro ao componente onde ele ocorreu, sem propagar
//e quebrar a pagina inteira

class MyErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    } //constructor

    static propTypes = {
        children: P.node.isRequired,
    };

    static getDerivedStateFromError(error) {
        //Atualiza o state para que a proxima renderizacao
        //mostre a UI alternativa
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        //Podemos tambem registrar o erro em algum servico
        //de log
        //logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            //Podemos renderizar qualquer UI alternativa
            return <h1>Algo deu errado.</h1>;
        }
        return this.props.children;
    }
} //MyErrorBoundary

// === COmponente que ira gerar error =======================================
export const ComponenteComErro = () => {
    const [counter, setCounter] = useState(0);

    //useEffect sera executado sempre que "counter" mudar
    useEffect(() => {
        if (counter > 3) throw new Error('Erro! Que pena...');
    }, [counter]);

    return (
        <div>
            <button onClick={() => setCounter((c) => c + 1)}>Click to increment {counter}</button>
        </div>
    );
};
//===========================================================================

function Component_errorBoundaries() {
    return (
        <div>
            <MyErrorBoundary>
                <ComponenteComErro />
            </MyErrorBoundary>
            <ComponenteComErro />
            <ComponenteComErro />
            <ComponenteComErro />
        </div>
    );
}

export default Component_errorBoundaries;
