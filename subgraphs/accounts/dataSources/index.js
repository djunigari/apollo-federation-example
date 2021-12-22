const knexConfig = require( '../config/knexfile.js')[process.env.NODE_ENV];

const AccountAPI = require('./AccountAPI')

module.exports = () => ({
     accountAPI: new AccountAPI(knexConfig)
})