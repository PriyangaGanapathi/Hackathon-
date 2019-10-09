import request from '../helpers/xhr';
import { authenticationListener, AUTHENTICATION_EVENTS } from '../context/useAuthentication';
import { LOCAL_STORAGE_KEYS } from '../config/constants';

var BASE_URL = process.env.REACT_APP_BASE_URL;
BASE_URL = BASE_URL[BASE_URL.length - 1] !== '/' ? BASE_URL + '/' : BASE_URL;

/**
 * Handle errors
 *
 * @param {Error Object} properties are message, request object, config object 
 */

function handleCommonErrors(error) {
    switch(error.request.status || null) {
        case 401:
            let isAuthenticated = window.localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
            if (isAuthenticated) {
                authenticationListener.publishEvent(AUTHENTICATION_EVENTS.LOGOUT);
            }
            break;
        case 403:
            //redirect to home page
            break;
        default:
    }
}

/**
 * Built URL by removing '/' in front of the route and by combining with base URL
 *
 * @param {string} route The route to which the request has to be send
 */

function buildURL(route) {
    return`${BASE_URL}${route[0] === '/'? route.substr(1): route}`;
}

/**
 * Make an ajax request 
 *
 * @param {string} route The route to which the request has to be send
 * @param {object} [customConfig] Options for the request 
 *   Options: timeout, withCredentials, headers, method, auth: {username: , password: }
 *            onRequestConstruct, responseType, onDownloadProgress, onUploadProgress, params
 * Note: Refer test file for detailed info
 */

export default async function sendWSRequest(route, customConfig = {}) {
    try {

        const token = window.localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) || null;
        const headers = {};
        
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const config = {
            method: customConfig.data ? 'POST' : 'GET',
            ...customConfig,
            headers: {
                ...headers,
                ...customConfig.headers
            }
        };

        try {
            return await request(buildURL(route), config);
        } catch (error) {
            handleCommonErrors(error);
            return Promise.reject(error);
        }

    } catch (err) {

        return Promise.reject(err);
    }
}


