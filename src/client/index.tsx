import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { ThemeContext } from '@skbkontur/react-ui';
import { App } from './components/App/App';
import { ErrorBoundary } from './components/Errors/ErrorBoundary/ErrorBoundary';
import { ThemeMui } from './client-tools/styles/theme-mui';
import { KonturTheme } from './client-tools/styles/theme-react';

ReactDOM.render(
    <ThemeProvider theme={ThemeMui}>
        <ThemeContext.Provider value={KonturTheme}>
            <BrowserRouter>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </BrowserRouter>
        </ThemeContext.Provider>
    </ThemeProvider>,
    document.getElementById('root'),
);
