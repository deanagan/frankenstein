interface Person {
  id: number;
  name: string;
}

interface CreatePersonInput {
  name: string;
}

// Define GraphQL query resolver type
interface QueryResolvers {
  getAllPeople: () => Person[]; // Ensure the resolver returns an array of Person
  getPerson: (parent: any, args: Pick<Person, "id">) => Person;
}

// Define GraphQL mutation resolver type
interface MutationResolvers {
  addPerson: (parent: any, args: CreatePersonInput) => Person;
}

export type Resolvers = {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
};
