import { useCallback, useRef, useState } from 'react';

type NewState = {
    [key: string]: any,
};

type NewStateFunction = <T> (prevState: T) => {};

type UpdateFunction = (newState: NewState | NewStateFunction, merge?: boolean) => NewState;

/**
 * Manage state similar to setState on class components.
 *
 * @param {object} defaultState
 * @returns {[unknown, (...args: any[]) => any]}
 */
const useSetState = <T> (defaultState: T): [T, UpdateFunction] => {
    const defaultStateRef = useRef<T>(defaultState);
    const [state, setState] = useState<T>(defaultState);

    const updateState = useCallback((newState: NewState | NewStateFunction, merge: boolean = true) => {
        setState((prevState: T) => {
            // if we have a function, pass previous state
            const updatedState = typeof newState === 'function' ? newState(prevState) : newState;

            // merge new state with previous state
            if (merge) {
                return {
                    ...prevState,
                    ...updatedState,
                };

                // if merge is disabled, merge with the default state
            } else {
                return {
                    ...defaultStateRef.current,
                    ...updatedState,
                };
            }
        });
    }, []) as UpdateFunction;

    return [state, updateState];
};

export default useSetState;
