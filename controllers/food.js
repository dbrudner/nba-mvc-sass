const {key} = require('../key')
const axios = require('axios')

const foodSearch = (term, render) => {
    const searchUrl = `https://api.nal.usda.gov/ndb/search/?format=json&q=${term}&sort=n&max=500&offset=0&api_key=${key}`

    axios.get(searchUrl).then(result => {
        res.render('search', result.data.list);
    })
}

module.exports = {
    foodSearch
}