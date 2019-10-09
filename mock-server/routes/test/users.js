var express = require('express');
var router = express.Router();

const users = {
	1: {
		id: 1,
		first_name: 'user',
		last_name: '1'
	},
	2: {
		id: 2,
		first_name: 'user',
		last_name: '2'
	}
};

router.get('/', function(req, res, next) {
	res.json(users[req.query.userId]);
});

router.post('/login', function(req, res, next) {
	res.json({ token: 'qwertyuiopasdfghjkl',
		userDetails: users[1]
	});
});

router.get('/:id/logout', function(req, res, next) {
	res.status(200).send();
});

router.get('/:userId', function(req, res, next) {
	if (req.params.userId) {
		res.json(users[req.params.userId]);
	} else {
		res.status(404).send();
	}
});


module.exports = router;