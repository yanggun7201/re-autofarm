import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from './theme';
import useSetState from "./core/hooks/useSetState";
import * as storage from "./includes/localStorage";
import 'react-pure-modal/dist/react-pure-modal.min.css';

type DEFAULT_STATE = {
    isDarkMode: boolean,
};

const setting = storage.retrieve('setting');

const DEFAULT_APP_STATE = {
    isDarkMode: setting?.isDarkMode ?? window.matchMedia("(prefers-color-scheme: dark)").matches,
};

function Root() {
    const [state, setState] = useSetState<DEFAULT_STATE>(DEFAULT_APP_STATE);

    const toggleTheme = useCallback(() => {
        setState((oldState: DEFAULT_STATE) => {
            storage.persist('setting', {
                isDarkMode: !oldState.isDarkMode
            });
            return {
                isDarkMode: !oldState.isDarkMode
            }
        });
    }, [setState]);

    return (
        <ThemeProvider theme={state.isDarkMode ? darkTheme : lightTheme}>
            <App toggleTheme={toggleTheme} />
        </ThemeProvider>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('root')
);
