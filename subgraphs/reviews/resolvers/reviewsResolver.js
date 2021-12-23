module.exports = {
    Product: {
        reviews(product,args, { dataSources }) {
            return dataSources.reviewAPI.findBYProductId(product.id)
        }
    }
}