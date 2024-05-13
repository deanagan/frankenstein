import { gql } from "apollo-server-express";

export const mutationTypeDefs = gql`
  type Mutation {
    addPerson(name: String): Person
  }
`;
