var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ title: 'Express', b: 'test' });
});

router.post('/login', function(req, res, next) {
	res.json({ token: 'qwertyuiopasdfghjkl' });
});

router.get('/fetch_concepts', function(req, res, next) {
	res.send(['categorie 1','categorie 2','categorie 3','categorie 4']);
});

router.post('/save_feedback', function(req, res, next) {
	res.status(200).send();
});

router.get('/fetch_keywords', function(req, res, next) {
	res.send([
		{"keyword": "herceptin1", "ferma_type": "Generic_drug", "real_world_type": "Generic_drug"
		},
		{"keyword": "herceptin2", "ferma_type": "Generic_drug", "real_world_type": "Generic_drug"
		},
		{"keyword": "herceptin3", "ferma_type": "Generic_drug", "real_world_type": "Generic_drug"
		},
		{"keyword": "herceptin4", "ferma_type": "Generic_drug", "real_world_type": "Generic_drug"
		},
		{"keyword": "herceptin5", "ferma_type": "Generic_drug", "real_world_type": "Generic_drug"
		}
	]);
});

module.exports = router;
