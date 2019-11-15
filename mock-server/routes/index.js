var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ title: 'Express', b: 'test' });
});

router.post('/login', function(req, res, next) {
	res.json({ token: 'qwertyuiopasdfghjkl' });
});

router.get('/logout', function (req, res, next) {
	res.status(200).send();
});

router.get('/fetch_concepts', function(req, res, next) {
	res.send(['categorie 1','categorie 2','categorie 3','categorie 4']);
});

router.post('/save_feedback', function(req, res, next) {
	res.send({ 
		"id": 1,
		"next_card": {
	    "card_type": 2,
	    "card_details": {
	       "keyword": "Herceptin",
	        "rel_type": "MANUFACTURED BY",
	        "rel_keyword": "Genentech Inc",
	        "rel_keyword_rw_type": "Agency",
	    }
	}});
});

router.get('/fetch_next_card', function(req, res, next) {
	res.send({
	    "card_type": 1,
	    "card_details": {
	        "keyword": "herceptin",
	        "ferma_type": "Generic Drug",
	        "real_world_type": "Brand Drug"
	    }
	});
});

router.get('/analytics', function(req, res, next) {
	res.send({		
		'confusion_matrix': {
			tp: 169,
			tn: 10,
			fp: 7,
			fn: 46
		},
		'overall_stats': {
			total: 100,
			approved: 20,
			suggestions: 20,
			skipped: 10
		}		
		
	})
});

module.exports = router;
