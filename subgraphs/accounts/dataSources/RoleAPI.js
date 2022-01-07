const { SQLDataSource } = require('datasource-sql');
const { roles } = require("../config/data");

class RoleAPI extends SQLDataSource {
    findById(id){
        return roles.find(role => role.id === id);
    }
}

module.exports = RoleAPI