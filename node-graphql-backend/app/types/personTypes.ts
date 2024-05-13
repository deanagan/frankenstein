import { gql } from "apollo-server-express";

export const personTypeDefs = gql`
  type Person {
    id: ID!
    name: String
  }
`;
