const knexConfig = require( '../config/knexfile.js')[process.env.NODE_ENV];

const ReviewAPI = require('./ReviewAPI')

module.exports = () => ({
     reviewAPI: new ReviewAPI(knexConfig)
})