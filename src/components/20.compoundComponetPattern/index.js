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
    Children,
    cloneElement,
    createContext,
    useContext,
} from 'react';

const myStyle = { style: { fontSize: '30px' } };

//== Compound Components =====================================================
//Componentes que nao fazem nada sozinhos mas que compoem um componente maior

const TurnOnOffContext = createContext();

//============================================================================
const TurnOnOff = ({ children }) => {
    const [isOn, setIsOn] = useState(false);

    const onTurn = () => {
        setIsOn((s) => !s);
    };

    /*
    return Children.map(children, (child) => {
        //Estou clonando o elemento child e retornando um novo, adicionando
        //propriedades "isOn" e "onTurn".
        //OBSERVE QUE ESTOU PEGANDO OS ELEMENTOS DIRETOS!!! CASO ENVOLVAMOS
        //OS ELEMENTOS POR UMA DIV, O ELEMENTO QUE IRA RECEBER OS ATRIBUTOS
        //SERA A DIV E NAO MAIS OS COMPONENTES, QUE PASSARAM A SER "NETOS".
        //Para "superar" isso, estamos usando context ("TurnOnOffContext")

        //Observe que elementos comuns (ex: div, span, p) sao do tipo "string"
        //esses elementos nao podem/devem receber os atributos do pai "isOn" e
        //"onTurn". Desta forma, nos devolvemos o elemento que recebemos sem
        //clona-los.
        if (typeof child.type === 'string') return child;

        const newChild = cloneElement(child, { isOn, onTurn });
        return newChild;
    });
    */

    //usando context
    return <TurnOnOffContext.Provider value={{ isOn, onTurn }}>{children}</TurnOnOffContext.Provider>;
};

TurnOnOff.propTypes = {
    children: P.any,
};

//============================================================================
//export const TurnedOn = ({ isOn, children }) => {
export const TurnedOn = ({ children }) => {
    //A propriedade "isOn" foi adicionado pelo componente pai. Se "isOn = true"
    //vou retornar o seu conteudo.
    const { isOn } = useContext(TurnOnOffContext);
    return isOn ? children : null;
};

TurnedOn.propTypes = {
    children: P.any,
};

//============================================================================
//export const TurnedOff = ({ isOn, children }) => {
export const TurnedOff = ({ children }) => {
    //A propriedade "isOn" foi adicionado pelo componente pai. Se "isOn = false"
    //vou retornar o seu conteudo.
    const { isOn } = useContext(TurnOnOffContext);

    return isOn ? null : children;
};

TurnedOff.propTypes = {
    children: P.any,
};

//============================================================================
//export const OnOffButton = ({ isOn, onTurn, ...props }) => {
export const OnOffButton = ({ ...props }) => {
    //As propriedades "isOn" e "onTurn" foram adicionadas pelo componente pai.
    //"...props" eh um spread onde estou pegando as propriedades do botao (no)
    //exemplo, o estilo
    const { isOn, onTurn } = useContext(TurnOnOffContext);

    return (
        <button {...props} onClick={onTurn}>
            Turn {isOn ? 'Off' : 'On'}
        </button>
    );
};

//============================================================================
//Eu estou criando uma forma onde os componentes filhos terao acesso ao componente pai
function Component_compoundComponentPattern() {
    return (
        <TurnOnOff>
            <TurnedOn>
                Aqui as coisas que vao acontecer quando estiver &apos;on&apos;
                <br />
            </TurnedOn>
            <TurnedOff>
                Aqui vem as coisas do &apos;off&apos;
                <br />
            </TurnedOff>
            <OnOffButton {...myStyle} />
        </TurnOnOff>
    );
}

export default Component_compoundComponentPattern;
