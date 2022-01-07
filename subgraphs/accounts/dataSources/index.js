const knexConfig = require( '../config/knexfile.js')[process.env.NODE_ENV];

const AccountAPI = require('./AccountAPI')
const UserAPI = require('./UserAPI')
const RoleAPI = require('./RoleAPI')
module.exports = () => ({
     accountAPI: new AccountAPI(knexConfig),
     userAPI: new UserAPI(knexConfig),
     roleAPI: new RoleAPI(knexConfig),
})