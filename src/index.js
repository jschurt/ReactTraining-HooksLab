import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import Component_useEffect from './components/01.useEffect';
//import Component_useCallback from './components/02.useCallBack';
//import Component_useMemo from './components/03.useMemo';
//import Component_useMemo2 from './components/04.useMemo_2';
//import Component_useRef from './components/05.useRef';
import Component_useContext from './components/06.useContext';
import Component_useContextOrganized from './components/07.useContext_Organized/index.js';
import Component_useReducer from './components/08.useReducer';
import Component_useReducer_useContext from './components/09.useReducer+useContext';
import Component_CustomHook from './components/10.customHook';
import Component_Organize_useEffect_useReducer_useContext_useRef from './components/11.Organize_useEffect_useReducer_useContext_useRef/templates';
import Component_CustomHook_FetchApi from './components/12.customHook_FetchApi';
import Component_CustomHook_useAsync from './components/13.customHook_useAsync';
import Component_useLayoutEffect from './components/14.useLayoutEffect';
import Component_useImperativeHandle from './components/15.useImperativeHandle';
import Component_useDebugValue from './components/17.useDebugValue+CustomHook';
import Component_hookExecutionOrder from './components/18.hookExecutionOrder';
import Component_errorBoundaries from './components/19.errorBoundaries';
import Component_compoundComponentPattern from './components/20.compoundComponetPattern';

ReactDOM.render(
    <React.StrictMode>
        {/*
        <App />
        <Component_useEffect />
        <Component_useCallBack />
        <Component_useMemo />
        <Component_useMemo2 />
        <Component_useRef />
        <Component_useContext />
        <Component_useContextOrganized />
        <Component_useReducer />
        <Component_useReducer_useContext />
        <Component_CustomHook />
        <Component_Organize_useEffect_useReducer_useContext_useRef />
        <Component_CustomHook_FetchApi />
        <Component_CustomHook_useAsync />
        <Component_useLayoutEffect />
        <Component_useImperativeHandle />
        <Component_useDebugValue />
        <Component_hookExecutionOrder />
        <Component_errorBoundaries />
        */}
        <Component_compoundComponentPattern />
    </React.StrictMode>,
    document.getElementById('root'),
);
