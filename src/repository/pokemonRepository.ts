import GetResponseType from "../types.ts/getResponseType";

const pokemonRepository = {
  get: function (): GetResponseType {
    return {
      status: 200,
      statusText: "OK",
      message: "all pokemon",
      data: [
        {
          uniqueId: "1",
          name: "pikachu",
          trainer: "ash",
        },
        {
          uniqueId: "2",
          name: "charizard",
          trainer: "brock",
        },
      ],
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getById: function (_id: string): GetResponseType {
    return {
      status: 200,
      statusText: "OK",
      message: "all pokemon",
      data: [
        {
          uniqueId: "1",
          name: "pikachu",
          trainer: "ash",
        },
      ],
    };
  },
};

export default pokemonRepository;
