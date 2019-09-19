import React from 'react';
import { HashRouter } from 'react-router-dom';

function AppProviders({ children }) {
    return (
        <HashRouter>
            {children}
        </HashRouter>
    );
}
export default AppProviders;
