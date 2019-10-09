import utils from '../utils';

function buildQueryString(object) {
	if (Object.prototype.toString.call(object) !== '[object Object]') return '';

	var args = [];
	for (var key in object) {
		destructure(key, object[key]);
	}

	return args.join('&');

	function destructure(key, value) {
		if (Array.isArray(value)) {
			for (let i = 0; i < value.length; i++) {
				destructure(key + '[' + i + ']', value[i]);
			}
		} else if (Object.prototype.toString.call(value) === '[object Object]') {
			// eslint-disable-next-line
			for (let i in value) {
				destructure(key + '[' + i + ']', value[i]);
			}
		} else
			args.push(
				encodeURIComponent(key) +
					(value != null && value !== '' ? '=' + encodeURIComponent(value) : '')
			);
	}
};

var assign =
	Object.assign ||
	function(target, source) {
		if (source)
			Object.keys(source).forEach(function(key) {
				target[key] = source[key];
			});
	};

function buildPathname(template, params) {
	// eslint-disable-next-line
	if (/:([^\/\.-]+)(\.{3})?:/.test(template)) {
		throw new SyntaxError('Template parameter names *must* be separated');
	}
	if (params == null) return template;
	var queryIndex = template.indexOf('?');
	var hashIndex = template.indexOf('#');
	var queryEnd = hashIndex < 0 ? template.length : hashIndex;
	var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
	var path = template.slice(0, pathEnd);
	var query = {};

	assign(query, params);

	// eslint-disable-next-line
	var resolved = path.replace(/:([^\/\.-]+)(\.{3})?/g, function(m, key, variadic) {
		delete query[key];
		// If no such parameter exists, don't interpolate it.
		if (params[key] == null) return m;
		// Escape normal parameters, but not variadic ones.
		return variadic ? params[key] : encodeURIComponent(String(params[key]));
	});

	// In case the template substitution adds new query/hash parameters.
	var newQueryIndex = resolved.indexOf('?');
	var newHashIndex = resolved.indexOf('#');
	var newQueryEnd = newHashIndex < 0 ? resolved.length : newHashIndex;
	var newPathEnd = newQueryIndex < 0 ? newQueryEnd : newQueryIndex;
	var result = resolved.slice(0, newPathEnd);

	if (queryIndex >= 0) result += template.slice(queryIndex, queryEnd);
	if (newQueryIndex >= 0)
		result += (queryIndex < 0 ? '?' : '&') + resolved.slice(newQueryIndex, newQueryEnd);
	var querystring = buildQueryString(query);
	if (querystring) result += (queryIndex < 0 && newQueryIndex < 0 ? '?' : '&') + querystring;
	if (hashIndex >= 0) result += template.slice(hashIndex);
	if (newHashIndex >= 0) result += (hashIndex < 0 ? '' : '&') + resolved.slice(newHashIndex);
	return result;
}

function constructError(message, config, request) {
	var error = new Error(message);
	error.config = config;
	error.request = request;
	return error;
}

var hasOwnProperty = Object.hasOwnProperty;	

export default function request(url, config) {
	return new Promise(function (resolve, reject) {
		var requestData = config.data || null;

		var request = new XMLHttpRequest(),
			abort = false;

		request.open(config.method.toUpperCase(),  buildPathname(url, config.params),
			true, (config.auth && config.auth.username) || null, (config.auth && config.auth.password) || null);

		request.timeout = config.timeout || 0;

		if (config.withCredentials) {
			request.withCredentials = true;
		}

		if (config.onRequestConstruct && typeof config.onRequestConstruct === 'function') {
			config.onRequestConstruct({
				requestObject: request, 
				cancelRequest: () => {
					if (request && request.readyState !== 4) {
						abort = true;
						request.abort();
					}
				}
			});
		}

		request.responseType = config.responseType || 'json';

		//set headers
		if (requestData) {
			if (utils.isURLSearchParams(requestData)) {
				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
				requestData = requestData.toString();
			} else if (utils.isFormData(requestData)) {
				// Let the browser set content-type for form data
			} else if (utils.isObject(requestData)) {
				request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
				requestData = JSON.stringify(requestData);
			}
		}
		request.setRequestHeader('Accept', 'application/json, text');
		 //Custom headers
		for (var key in config.headers) {
			if (hasOwnProperty.call(config.headers, key)) {
				request.setRequestHeader(key, config.headers[key]);
			}
		}

		request.onreadystatechange = function() {

			if (abort || !request || request.readyState !== 4) {
				return;
			}

			//2xx - Succsss, 3xx - Redirection (304: Not Modified)
			if ((request.status >= 200 && request.status < 300)
				|| request.status === 304 || /^file:\/\//i.test(url)) {
				// Prepare the response
				let responseData = config.responseType === 'text' ? request.responseText : request.response;
				resolve(responseData);
			} else {
				reject(constructError('server error', config, request));
			}

			// Clean up request
			request = null;
		};

		// Handle browser request cancellation (as opposed to a manual cancellation)
		request.onabort = function handleAbort() {

			reject(constructError('Request aborted', config, request));

			// Clean up request
			request = null;
		};

		// Handle low level network errors
		request.onerror = function handleError() {
			// Real errors are hidden from us by the browser
			// onerror should only fire if it's a network error
			reject(constructError('Network Error', config, request));

			// Clean up request
			request = null;
		};

		// Handle progress if needed
		if (typeof config.onDownloadProgress === 'function') {
			request.addEventListener('progress', config.onDownloadProgress);
		}

		// Not all browsers support upload events
		if (typeof config.onUploadProgress === 'function' && request.upload) {
			request.upload.addEventListener('progress', config.onUploadProgress);
		}

		// Send the request
		request.send(requestData);

	});
}
