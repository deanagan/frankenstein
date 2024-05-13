import { Resolvers } from "../types";
import people from "../dataset"; //get all of the available data from our dummy database for now

export const getAllPeople: Resolvers["Query"]["getAllPeople"] = () => {
  return people.map((person) => ({ ...person, id: person.id }));
};

export const getPerson: Resolvers["Query"]["getPerson"] = (_, args: any) => {
  const person = people.find((person) => person.id === args.id);

  if (!person) {
    throw new Error(`Person with ID ${args.id} not found`);
  }

  return person;
};
