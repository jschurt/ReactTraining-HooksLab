import * as types from './types';

export const myReducer_CounterProvider = (estado, action) => {
    switch (action.type) {
        case types.DECREMENT_COUNTER:
            return { ...estado, counter: estado.counter - 1 };
        case types.INCREMENT_COUNTER:
            return { ...estado, counter: estado.counter + 1 };
    }

    return { ...estado };
};
