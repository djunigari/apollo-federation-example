require('dotenv').config()

const { ApolloGateway, RemoteGraphQLDataSource} = require('@apollo/gateway')
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const express = require("express")
const http = require('http')
const expressJwt = require("express-jwt");

async function startApolloServer() {
    const app = express();
    app.use(
        expressJwt({
          secret: process.env.APP_AUTH_SECRET,
          algorithms: ["HS256"],
          credentialsRequired: false
        })
    );

    const httpServer = http.createServer(app);

    const gateway = new ApolloGateway({
        serviceList: [{ name: "accounts", url: "http://localhost:4001" },
        { name: "products", url: "http://localhost:4002" },],
        buildService({ name, url }) {
            return new RemoteGraphQLDataSource({
              url,
              willSendRequest({ request, context }) {
                request.http.headers.set(
                  "user",
                  context.user ? JSON.stringify(context.user) : null
                );
              }
            });
          }
    });

    const server = new ApolloServer({
        gateway,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        subscriptions: false,
        context: ({ req }) => {
            const user = req.user || null;
            return { user };
          }
    });

    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => httpServer.listen({ port: process.env.APP_PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

module.exports = { startApolloServer }