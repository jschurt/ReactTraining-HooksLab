import { useState, useEffect, useReducer, createContext, useContext, useRef } from 'react';
import './style.css';
import P from 'prop-types';
import { PostsProvider } from '../contexts/PostsProvider';
import { Posts } from '../components/Posts';
import { CounterProvider } from '../contexts/CounterProvider';

function Component_Organize_useEffect_useReducer_useContext_useRef() {
    return (
        <CounterProvider>
            <PostsProvider>
                <div className="App">
                    <Posts />
                </div>
            </PostsProvider>
        </CounterProvider>
    );
}

export default Component_Organize_useEffect_useReducer_useContext_useRef;
