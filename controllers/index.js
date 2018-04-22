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
	const searchUrl = `https://api.nal.usda.gov/ndb/search/?format=json&q=${term}&sort=n&max=500&offset=0&api_key=${key}`

    axios.get(searchUrl).then(result => {
		if (result.data.errors) {
			return res.render('search-results', {error: "No results"});
		}

		const foods = result.data.list.item
		const totalResults = (foods.length === 500 ? "500+" : foods.length);
		const tooLarge = (foods.length === 500 ? true : false)
		const hbsObject = {
			foods, 
			totalResults,
			tooLarge
		}

        res.render('search-results', hbsObject);
    })
})

router.get('/food/:ndbno', (req, res) => {

	// This is the id the API uses to find a specific food
	const {ndbno} = req.params

	const searchUrl = `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=b&format=json&api_key=${key}`

	axios.get(searchUrl).then(result => {
		let food = result.data.foods[0].food
		console.log(food);
		// Capitalize each word in ingredient string

		if (food.ing) {
			let capitalizedIngredients = food.ing.desc.split(' ').map(ing => _.capitalize(ing)).join(' ')

			food = {...food, capitalizedIngredients}
		}
		



		res.json(food);
	})
})

module.exports = router;