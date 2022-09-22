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
};

export default pokemonRepository;
