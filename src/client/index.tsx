import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { App } from './components/App/App';
import { ErrorBoundary } from './components/Errors/ErrorBoundary/ErrorBoundary';
import { ThemeMui } from './client-tools/styles/theme-mui';

ReactDOM.render(
    <ThemeProvider theme={ThemeMui}>
        <BrowserRouter>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </BrowserRouter>
    </ThemeProvider>,
    document.getElementById('root'),
);
