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

	const authenticate = async (credentials = {}) => {
		try {
			let data = credentials;
			let response = await sendWSRequest(`/login`, { 
				data: data
			});
			setToken(response.token);
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
		});
	}, []);

	return {
		token,
		isAuthenticated,
		authenticate,
		unauthenticate
	}
}

const authContext = createContext({
	token: null,
	isAuthenticated: () => {},
	authenticate: () => {},
	unauthenticate: () => {}
});

export function ProvideAuth({ children }) {
  const auth = useAuthentication();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};



