import PokemonDataType from "./pokemonDataType";

type GetResponseType = {
  status: number;
  statusText: string;
  message: string;
  data: PokemonDataType[];
};

export default GetResponseType;
