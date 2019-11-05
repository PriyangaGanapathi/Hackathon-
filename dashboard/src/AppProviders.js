import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ProvideAuth } from './context/useAuthentication';

function AppProviders({ children }) {
    return (
    	<ProvideAuth>
	        <HashRouter>
	            {children}
	        </HashRouter>
	    </ProvideAuth>
    );
}
export default AppProviders;
