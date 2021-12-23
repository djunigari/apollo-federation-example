const { SQLDataSource } = require('datasource-sql');
const { reviews } = require('../config/data')

class ReviewAPI extends SQLDataSource {
    findById(id){
        return reviews.find(review => review.id === id);
    }
    all(){
        return reviews
    }
    findBYProductId(productId){
        return reviews.filter(review => review.product.id = productId)
    }
}

module.exports = ReviewAPI