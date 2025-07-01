const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs/typeDefs");
const resolvers = require("./resolvers/resolvers");

async function setupApolloServer(app) {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
}

module.exports = setupApolloServer;
