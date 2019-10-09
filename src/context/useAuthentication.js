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

	const [ token, setToken, removeToken ] = useLocalStorage(LOCAL_STORAGE_KEYS.TOKEN),
		  [ userDetails, setUserDetails, removeUserDetails ] = useLocalStorage(LOCAL_STORAGE_KEYS.USER_DETAILS);

	const authenticate = async (credentials = {}) => {
		try {
			let data = {
				staysigned: false,
				...credentials
			};
			let response = await sendWSRequest(`users/login`, { 
				data: data
			});
			setToken(response.token);
			setUserDetails(response.userDetails);
			return response;
		} catch(error) {
			return Promise.reject(error);
		}
	}

	const unauthenticate = async () => {
		try {
			let response = await sendWSRequest(`users/${userDetails.id}/logout`);
			removeToken();
			removeUserDetails();
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
			removeUserDetails();
		});
	}, []);

	return {
		token,
		isAuthenticated,
		userDetails,
		authenticate,
		unauthenticate
	}
}

const authContext = createContext({
	token: null,
	isAuthenticated: () => {},
	userDetails: null,
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



