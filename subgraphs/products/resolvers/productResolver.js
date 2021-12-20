module.exports = {
    Query: {
      bestSellers:(_,{category}) => {return null},
      categories: _ => {return null},
      product:(_,{id}) => {
        return {
          id: 1,
          title: 'Iphone 13 Pro',
          url: 'https://www.apple.com',
          description: 'Lançado em 2021',
          price: {
            cost: {
              amount: 200.000,
              currencyCode: 'USD'
            },
            deal: 180.000,
            dealSavings: {
              amount: 20.000,
              currencyCode: 'USD'
            }
          },
          salesRank: 1,
          salesRankOverall: 1,
          salesRankInCategory: 1,
          category: 'ELECTRONICS',
          images: null,
          primaryImage: null
        }
      
      }
    }
}