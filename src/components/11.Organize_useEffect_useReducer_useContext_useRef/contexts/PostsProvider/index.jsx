import { PostsContext } from './context';
import P from 'prop-types';
import { useReducer } from 'react';
import { myReducer } from './reducer';
import { data } from './data';

export const PostsProvider = ({ children }) => {
    const [postsEstado, postsDispatch] = useReducer(myReducer, data);
    return <PostsContext.Provider value={{ postsEstado, postsDispatch }}>{children}</PostsContext.Provider>;
};

PostsProvider.propTypes = {
    children: P.node.isRequired,
};
