// src/types/queryTypes.ts

import { gql } from "apollo-server-express";

export const queryTypeDefs = gql`
  type Query {
    getAllPeople: [Person]
    getPerson(id: Int): Person
  }
`;
