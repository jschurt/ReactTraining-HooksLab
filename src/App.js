import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
//import { Component } from 'react';

// //Trabalhando com componente de classe
// class App extends Component {
//     /*
//     constructor(props) {
//         super(props);

//         //para usar o state dentro de uma funcao, sou obrigado
//         //a fazer o bind do this. (Isso foi um dos motivos que
//         //levou a criacao/uso dos hooks.)
//         this.handleReverseButton = this.handleReverseButton.bind(this);

//         this.state = {
//             reverse: true,
//         };
//     }

//     handleReverseButton() {
//         const { reverse } = this.state;
//         console.log('========>', reverse);
//         this.setState({ reverse: !reverse });
//     }
// */

//     //Ao inves de usar constructor e bind do "this"
//     //podemos trabalhar de uma maneira melhor, usando
//     //class fields (para declarar minhas variaveis de estado)
//     //e arrow functions para o bind do this.
//     state = {
//         reverse: false,
//     };

//     handleReverseButton = () => {
//         alert(1);
//         const { reverse } = this.state;
//         console.log('========>', reverse);
//         this.setState({ reverse: !reverse });
//     };

//     render() {
//         const { reverse } = this.state;
//         const className = !reverse ? 'App-logo-reverse' : 'App-logo';
//         alert(className);
//         return (
//             <div className="App">
//                 <header className="App-header">
//                     <img src={logo} className={className} alt="logo" />
//                     <button type="button" style={{ zIndex: '1' }} onClick={this.handleReverseButton}>
//                         Reverse
//                     </button>
//                 </header>
//             </div>
//         );
//     }
// }

//====Usando hooks===========================================================

function App() {
    //useState controla o meu estado e o seu valor inicial. O primeiro valor
    //retornado por useState eh a variavel que contera a informacao, e o
    //segundo valor eh a funcao que sera responsavel para "setar" o estado.
    const [reverse, setReverse] = useState(false);
    const [counter, setCounter] = useState(0);

    const className = !reverse ? 'App-logo-reverse' : 'App-logo';

    //ao inves de this para recuperar a variavel de estado, o estado, por
    //estar dentro da funcao, ja esta acessivel em qq lugar da funcao
    const handleReverseButton = () => {
        //const { reverse } = this.state; //<=== Nao eh mais necessario
        //this.setState({ reverse: !reverse }); //<== tb nao existe mais
        setReverse(!reverse);

        //ou usando funcao de callback
        setCounter((prevCount) => prevCount + 1);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className={className} alt="logo" />

                <h1>Contador: {counter}</h1>

                <button type="button" style={{ zIndex: '1' }} onClick={handleReverseButton}>
                    Reverse
                </button>
            </header>
        </div>
    );
}

export default App;
