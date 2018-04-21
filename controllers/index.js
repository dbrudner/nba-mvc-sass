const express = require('express');

const router = express.Router();

const {key} = require('../key')
const axios = require('axios')

router.get('/', function(req, res) {
	res.render('index')
})

router.get('/search/:term', (req, res) => {
	const term = req.params.term
	// food.foodSearch(term, res.render)
	const searchUrl = `https://api.nal.usda.gov/ndb/search/?format=json&q=${term}&sort=n&max=500&offset=0&api_key=${key}`

    axios.get(searchUrl).then(result => {
		console.log(result.data.list);
		const foods = result.data.list.item

		const totalResults = (foods.length === 500 ? "500+" : foods.length);


		const hbsObject = {
			foods, 
			totalResults
		}

        res.render('search-results', hbsObject);
    })
})

module.exports = router;