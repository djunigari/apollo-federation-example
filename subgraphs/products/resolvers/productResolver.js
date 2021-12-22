module.exports = {
    Query: {
      bestSellers:(_,{category}) => {return null},
      categories: _ => {return null},
      product:(_,{id}, { dataSources }) => {
        return dataSources.productAPI.findById(id)
      }
    }
}