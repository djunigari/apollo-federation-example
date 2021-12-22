const { ApolloServer } = require('apollo-server');
const { applyMiddleware } = require("graphql-middleware");
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { ApolloServerPluginInlineTraceDisabled } = require('apollo-server-core')

const { permissions } = require("./config/permissions");

const dataSources = require('./dataSources')
const context = require('./config/context')
const formatError = require('./config/formatError')
const typeDefs = require('./schema/typeDefs')
const resolvers = require('./resolvers')

const server = new ApolloServer({
  dataSources,
  context,
  formatError,
  schema: applyMiddleware(
    buildSubgraphSchema([{ typeDefs, resolvers }]),
    permissions
  ),
  plugins: [ApolloServerPluginInlineTraceDisabled()],
});

server.listen(process.env.APP_ACCOUNTS_PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});