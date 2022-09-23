import { NextFunction, Request, Response } from "express";
import HttpCode from "http-codes";
import pokemonRepository from "../repository/pokemonRepository";
import { PokemonDataSearchType, PokemonDataType } from "../types.ts/pokemonDataType";

const getPokemon = (req: Request, res: Response, next: NextFunction): void => {
  pokemonRepository.get(
    (data) => {
      res.status(HttpCode.OK).json({
        status: HttpCode.OK,
        statusText: "OK",
        message: "all pokemon",
        data,
      });
    },
    (err) => next(err)
  );
};

const searchPokemon = (req: Request, res: Response, next: NextFunction): void => {
  const searchObject: PokemonDataSearchType = {
    uniqueId: req.query.uniqueId?.toString() ?? null,
    name: req.query.name?.toString() ?? null,
    trainer: req.query.trainer?.toString() ?? null,
  };
  pokemonRepository.search(
    searchObject,
    (data) => {
      const response = data as PokemonDataType[];

      if (response && response.length > 0) {
        res.status(HttpCode.OK).json({
          status: HttpCode.OK,
          statusText: "OK",
          message: "get pokemon by searching",
          data,
        });
      } else {
        res.status(HttpCode.NOT_FOUND).json({});
      }
    },
    (err) => next(err)
  );
};

const getPokemonById = (req: Request, res: Response, next: NextFunction): void => {
  pokemonRepository.getById(
    req.params.id,
    (data) => {
      if (data) {
        res.status(HttpCode.OK).json({
          status: HttpCode.OK,
          statusText: "OK",
          message: "get pokemon by id",
          data,
        });
      } else {
        res.status(HttpCode.NOT_FOUND).json({});
      }
    },
    (err) => next(err)
  );
};

export { getPokemon, searchPokemon, getPokemonById };
