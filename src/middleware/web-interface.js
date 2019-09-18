import request from '../helpers/xhr';

function handleCommonErrors(error) {
    switch(error.request.status) {
        case 401:
            //handle logout
            break;
        case 403:
            //redirect to home page
            break;
        default:
    }
}

export default async function sendWSRequest(url, customConfig = {}) {
    try {

        const config = {
            method: customConfig.data ? 'POST' : 'GET',
            ...customConfig
        };

        try {
            const response = await request(url, config);
            return response;
        } catch (error) {
            handleCommonErrors(error);
            return Promise.reject(error);
        }

    } catch (err) {

        return Promise.reject(err);
    }
}


