import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Login from './pages/Login';
import Home from './pages/Home';
import { useAuth } from './context/useAuthentication.js';

function App() {

	const { isAuthenticated } = useAuth();

	return (
		<Switch>
			<Route path="/" 
				render= {() => {
					return isAuthenticated() ? <Home/> : <Login/>;
				}}
			/>
		</Switch>
	);
}

export default App;
