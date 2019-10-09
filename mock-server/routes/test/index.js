var express = require('express');
var router = express.Router();

router.get('/timeout/:ms', function(req, res, next) {
	setTimeout((function() {
		res.send('Response after '+ req.params.ms + 'ms');
	}), req.params.ms);
});

router.get('/download/image', function(req, res, next) {
	var path = require('path');
	var appDir = path.dirname(require.main.filename);
	appDir = appDir.replace('/bin', '');
	res.sendFile(appDir + '/public/assets/images/zoomrx.ico');
});

router.post('/upload', function(req, res, next) {
	res.end('upload successful');
});

router.post('/postdata', function(req, res, next) {
	res.send('Formdata received');
});

router.get('/customHeader', function(req, res, next) {
	if (req.header('custom-header') === 'value') {
		res.send('Custom header received');
	} else {
		res.send('Custom header not received');
	}
});

router.get('/customMethod', function(req, res, next) {
	if (req.method === 'GET') {
		res.send('Custom method received');
	} else {
		res.send('Custom method not received');
	}
});

module.exports = router;