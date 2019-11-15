import React, { useEffect, useContext, createContext } from 'react';
import sendWSRequest from '../services/web-interface';
import { LOCAL_STORAGE_KEYS } from '../config/constants';
import customEventListener from '../helpers/custom-event-listener';
import useLocalStorage from '../helpers/useLocalStorage';

export const AUTHENTICATION_EVENTS = {
	LOGOUT: 'logout'
};

export const authenticationListener = new customEventListener();

function useAuthentication() {

	const [ token, setToken, removeToken ] = useLocalStorage(LOCAL_STORAGE_KEYS.TOKEN);
	const [ level, setLevel, removeLevel ] = useLocalStorage('level');
	const [ contributions, setContributions, removeContributions] =  useLocalStorage('contributions');
	const [ username, setUsername, removeUsername] = useLocalStorage('username');
	const [ email, setEmail, removeEmail] = useLocalStorage('email');


	const authenticate = async (credentials = {}) => {
		try {
			let data = credentials;
			let response = await sendWSRequest(`/login`, { 
				data: data
			});
			setToken(response.token);
			setLevel(response.level);
			setContributions(response.contributions);
			setUsername(response.username);
			setEmail(response.email);
			return response;
		} catch(error) {
			return Promise.reject(error);
		}
	}

	const unauthenticate = async () => {
		try {
			let response = await sendWSRequest(`/logout`);
			removeToken();
			return response;
		} catch(error) {
			return Promise.reject(error);
		}
	}

	const isAuthenticated = () => {
		return !!token;
	}

	useEffect(() => {
		return authenticationListener.subscribeEvent(AUTHENTICATION_EVENTS.LOGOUT, () => {
			removeToken();
			removeLevel();
			removeContributions();
			removeUsername();
			removeEmail();
		});
	}, []);

	return {
		token,
		isAuthenticated,
		authenticate,
		unauthenticate,
		setContributions,
		contributions,
		username,
		email,
		level
	}
}

const authContext = createContext({
	token: null,
	isAuthenticated: () => {},
	authenticate: () => {},
	unauthenticate: () => {},
	setContributions:() => {},
	contributions: null,
	username: null,
	email: null
});

export function ProvideAuth({ children }) {
  const auth = useAuthentication();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};



