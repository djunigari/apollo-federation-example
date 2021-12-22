const { SQLDataSource } = require('datasource-sql');
const { accounts } = require("../config/data");

class AccountAPI extends SQLDataSource {
    findById(id){
        return accounts.find(account => account.id === id);
    }
    all(){
        return accounts
    }
    login(email, password){
        return accounts.find(
            account => account.email === email && account.password === password )
    }
}

module.exports = AccountAPI