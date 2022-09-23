import fs from "fs";
import PokemonDataType from "../types.ts/pokemonDataType";
import { RejectCallback, ResolveCallback } from "../types.ts/common";

const FILENAME = "./src/assets/pokemon.json";

const pokemonRepository = {
  get: (resolve: ResolveCallback, reject: RejectCallback): void => {
    fs.readFile(FILENAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data.toString()));
      }
    });
  },
  getById: (id: string, resolve: ResolveCallback, reject: RejectCallback): void => {
    fs.readFile(FILENAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data.toString()).find((pe: PokemonDataType) => pe.uniqueId === id));
      }
    });
  },
};

export default pokemonRepository;
