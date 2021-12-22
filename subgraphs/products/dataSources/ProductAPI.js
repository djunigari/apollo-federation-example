const { SQLDataSource } = require('datasource-sql');
const { products } = require('../config/data')

class AccountAPI extends SQLDataSource {
    findById(id){
        return products.find(product => product.id === id);
    }
    all(){
        return products
    }
}

module.exports = AccountAPI