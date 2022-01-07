const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer, ApolloServerPluginInlineTraceDisabled } = require('apollo-server-core')
const { applyMiddleware } = require("graphql-middleware")
const { buildSubgraphSchema } = require('@apollo/subgraph')

const express = require('express')
const http = require('http')

const { permissions } = require("./config/shield/permissions");

const dataSources = require('./dataSources')
const context = require('./config/context')
const formatError = require('./config/formatError')
const typeDefs = require('./schema/typeDefs')
const resolvers = require('./resolvers')

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const config = {
    dataSources,
    context,
    formatError,
    schema: applyMiddleware(
      buildSubgraphSchema([{ typeDefs, resolvers }]),
      permissions
    ),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),ApolloServerPluginInlineTraceDisabled],
  }

  const server = new ApolloServer(config);
  await server.start();
  server.applyMiddleware({ app, path: '/accounts' });

  const port = process.env.APP_ACCOUNTS_PORT

  await new Promise(resolve => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

module.exports = {startApolloServer}
