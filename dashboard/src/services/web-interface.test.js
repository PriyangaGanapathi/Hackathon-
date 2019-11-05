import sendWSRequest from'./web-interface';

var formdata = new FormData();
	formdata.append('name', 'John Doe');
	formdata.append('email', 'johndoe@zrx.com');

test('xhr successfully resolved with data', async () => {
	let response = await sendWSRequest('users/1');
	expect(response.id).toBe(1);
});

test('xhr failed with error', async () => {
	try {
		let response = await sendWSRequest('users/3');
	} catch(error) {
		expect(error.request.status).toBe(404);
	}
});

test('Server failed to response within timeout', async () => {
	try {
		let response = await sendWSRequest('timeout/500', {
			// `timeout` specifies the number of milliseconds before the request times out.
			// If the request takes longer than `timeout`, the request will be aborted.
			// default 0 (not set)
			timeout: 200
		});
	} catch(error) {
		expect(error.message).toBe('server error');
	}
});

test('Server responded within timeout', async () => {
	let response = await sendWSRequest('timeout/500', {
		timeout: 600,
		responseType: 'text'
	});
	expect(response).toBe('Response after 500ms');
});

test('send formdata', async () => {
	let response =await sendWSRequest('postdata', {
		data: formdata,  // `data` is the data to be sent as the request body
		responseType: 'text'
	});
	expect(response).toBe('Formdata received');
});

test('Download progress for image', async () => {
	let downloadProgressCalled = false;
	await sendWSRequest('download/image', {
		onDownloadProgress: function(progressEvent) {
			downloadProgressCalled = true;
			expect(progressEvent.type).toBe('progress');
		}
	});
	expect(downloadProgressCalled).toBe(true);
});

test('upload progress', async () => {
	let uploadProgressCalled = false;
	await sendWSRequest('upload', {
		data: formdata,  // `data` is the data to be sent as the request body
		onUploadProgress: function(progressEvent) {
			uploadProgressCalled = true;
			expect(progressEvent.type).toBe('progress');
		}
	});
	expect(uploadProgressCalled).toBe(true);
});

test('xhr abort', () => {
	let cancel;
	sendWSRequest('users/1', {
		onRequestConstruct: ({ requestObject, cancelRequest }) => {
			cancel = cancelRequest;
		}
	}).catch( error => {
		expect(error.message).toBe('Request aborted');
	});
	cancel();
});

test('xhr request with params', async () => {
	let response = await sendWSRequest('users/', {
		params: {
			userId: 1
		}
	});
	expect(response.id).toBe(1);
});

test('xhr providing custom headers', async () => {
	let response = await sendWSRequest('customHeader', {
		headers: {
			'custom-header': 'value'
		},
		responseType: 'text'
	});
	expect(response).toBe('Custom header received');
});

test('xhr providing method', async () => {
	let response = await sendWSRequest('customMethod', {
		method: 'GET',
		responseType: 'text'
	});
	expect(response).toBe('Custom method received');
})
