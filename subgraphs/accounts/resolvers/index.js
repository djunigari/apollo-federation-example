const { mergeResolvers } = require('@graphql-tools/merge')
const account = require('./accountResolver')

const resolvers = [account]

module.exports = mergeResolvers(resolvers)