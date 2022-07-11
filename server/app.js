const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const typeDefs = require("./schema");
const resolvers = require("./resolver");

(async (typeDefs, resolvers) => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/",
  });

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(
    `👋 🙏 🤝 🚀 Server ready at http://localhost:4000${server.graphqlPath}`
  );
})(typeDefs, resolvers);
