import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import AppProviders from './AppProviders';

const app = (
    <AppProviders>
        <App />
    </AppProviders>
);

ReactDOM.render(app, document.getElementById('root'));
