const { SQLDataSource } = require('datasource-sql');
const { accounts,userDetails,roles } = require("../config/data");

class UserAPI extends SQLDataSource {
    findById(id){
        return userDetails.find(user => user.id === id);
    }
}

module.exports = UserAPI