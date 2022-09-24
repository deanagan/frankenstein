import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { PokemonDataSearchType, PokemonDataType } from "../types.ts/pokemon.data.type";
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
  insert: (newPokemon: PokemonDataType, resolve: ResolveCallback, reject: RejectCallback): void => {
    fs.readFile(FILENAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const currentPokemonList = JSON.parse(data.toString());
        const pokemonUniqueId = { uniqueId: uuidv4() };
        const pokemon = { ...pokemonUniqueId, ...newPokemon };
        currentPokemonList.push(pokemon);
        fs.writeFile(FILENAME, JSON.stringify(currentPokemonList), (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(pokemon);
        });
      }
    });
  },
  update: (
    pokemonUpdate: PokemonDataType,
    uniqueId: string,
    resolve: ResolveCallback,
    reject: RejectCallback
  ): void => {
    fs.readFile(FILENAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const currentPokemonList = JSON.parse(data.toString());

        const updatedPokemonList = currentPokemonList.map((pokemon: PokemonDataType) =>
          pokemon.uniqueId === uniqueId ? { ...pokemon, ...pokemonUpdate } : pokemon
        );

        fs.writeFile(FILENAME, JSON.stringify(updatedPokemonList), (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(updatedPokemonList.find((pokemon: PokemonDataType) => pokemon.uniqueId === uniqueId));
        });
      }
    });
  },
};

export default pokemonRepository;
