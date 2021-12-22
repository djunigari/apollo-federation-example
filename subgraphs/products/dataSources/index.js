const knexConfig = require( '../config/knexfile.js')[process.env.NODE_ENV];

const ProductAPI = require('./ProductAPI')

module.exports = () => ({
     productAPI: new ProductAPI(knexConfig)
})