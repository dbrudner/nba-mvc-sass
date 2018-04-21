const express = require('express');

const router = express.Router();

const {key} = require('../key')
const axios = require('axios')
const _ = require('lodash');

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
		const tooLarge = (foods.length === 500 ? true : false)

		console.log(foods);

		const hbsObject = {
			foods, 
			totalResults,
			tooLarge
		}

        res.render('search-results', hbsObject);
    })
})

router.get('/food/:ndbno', (req, res) => {

	const {ndbno} = req.params

	const searchUrl = `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=b&format=json&api_key=${key}`

	axios.get(searchUrl).then(result => {
		let food = result.data.foods[0].food

		// Capitalize each word in ingredient string
		let capitalizedIngredients = food.ing.desc.split(' ').map(ing => _.capitalize(ing)).join(' ')

		food = {...food, capitalizedIngredients}

		console.log(food);

		res.json(food);
	})
})

module.exports = router;