const { mergeResolvers } = require('@graphql-tools/merge')
const reviews = require('./reviewsResolver')

const resolvers = [reviews]

module.exports = mergeResolvers(resolvers)