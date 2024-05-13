import { Resolvers } from "../types";
import people from "../dataset"; //get all of the available data from our dummy database for now

export const addPerson: Resolvers["Mutation"]["addPerson"] = (_, args: any) => {
  const newPerson = {
    id: people.length + 1,
    name: args.name,
  };
  people.push(newPerson);

  return newPerson;
};
