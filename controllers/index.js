const express = require('express');
const food = require('./food');

const router = express.Router();


router.get('/', function(req, res) {
	res.render('index')
})

router.get('/search/:term', (req, res) => {
	const term = req.params.term
	food.foodSearch(term, res)
})

module.exports = router;