import * as types from './types';

export const decrementCounter = (dispatch) => {
    dispatch({ type: types.DECREMENT_COUNTER });
};

export const incrementCounter = (dispatch) => {
    dispatch({ type: types.INCREMENT_COUNTER });
};
