const {key} = require('../key')
const axios = require('axios')

const foodSearch = term => {
    const searchUrl = `https://api.nal.usda.gov/ndb/search/?format=json&q=${term}&sort=n&max=25&offset=0&api_key=${key}`

    axios.get(searchUrl).then(res => {
        console.log(res);
    })
}

foodSearch('butter');