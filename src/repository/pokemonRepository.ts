import fs from "fs";
import { PokemonDataSearchType, PokemonDataType } from "../types.ts/pokemonDataType";
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
  search: (searchObject: PokemonDataSearchType, resolve: ResolveCallback, reject: RejectCallback): void => {
    fs.readFile(FILENAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const filteredData = JSON.parse(data.toString()).filter(
          (pe: PokemonDataType) =>
            (searchObject.uniqueId && pe.uniqueId.toLowerCase() === searchObject.uniqueId.toLowerCase()) ||
            (searchObject.name && pe.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0) ||
            (searchObject.trainer && pe.trainer.toLowerCase().indexOf(searchObject.trainer.toLowerCase()) >= 0)
        );
        resolve(filteredData);
      }
    });
  },
};

export default pokemonRepository;
