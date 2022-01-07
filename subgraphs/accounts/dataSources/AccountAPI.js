const { SQLDataSource } = require('datasource-sql');
const { accounts,userDetails,roles } = require("../config/data");

class AccountAPI extends SQLDataSource {
    findById(id){
        return accounts.find(account => account.id === id);
    }
    all(){
        return accounts
    }
    login(email, password){
        const account =  accounts.find(
            account => account.email === email && account.password === password )
        const roleList = []
        account.roles.forEach(r => {
            const role = roles.find( role => role.id === r.id)
            if(role) roleList.push(role)
        })
        return {
            id: account.id,
            roles: roleList
        }
    }
}

module.exports = AccountAPI