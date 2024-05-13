import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";

import { getAllPeople, getPerson } from "./resolvers/queryResolvers";
import { addPerson } from "./resolvers/mutationResolvers";
import { Resolvers } from "./types";
import { personTypeDefs } from "./types/personTypes";
import { queryTypeDefs } from "./types/queryTypes";
import { mutationTypeDefs } from "./types/mutationTypes";
import { DocumentNode } from "graphql";

const resolvers: Resolvers = {
  Query: {
    getAllPeople,
    getPerson,
  },
  Mutation: {
    addPerson,
  },
};

const typeDefs: DocumentNode = gql`
  ${personTypeDefs}
  ${queryTypeDefs}
  ${mutationTypeDefs}
`;

async function startApolloServer(typeDefs: DocumentNode, resolvers: Resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers,
    //tell Express to attach GraphQL functionality to the server
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  }) as any;
  await server.start(); //start the GraphQL server.
  server.applyMiddleware({ app });
  await new Promise<void>(
    (resolve) => httpServer.listen({ port: 4000 }, resolve), //run the server on port 4000
  );
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}
//in the end, run the server and pass in our Schema and Resolver.
startApolloServer(typeDefs, resolvers);
