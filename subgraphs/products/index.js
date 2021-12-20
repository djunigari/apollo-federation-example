const { ApolloServer } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const typeDefs = require('./schema/typeDefs')
const resolvers = require('./resolvers')

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

// The `listen` method launches a web server.
server.listen(4001).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});