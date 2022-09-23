import express from "express";
import chalk from "chalk";
import Debug from "debug";
import HttpCode from "http-codes";
import pokemonRepository from "./repository/pokemonRepository";

const app = express();
const debug = Debug("app");
const PORT = process.env.PORT || 8081;
const router = express.Router();

router.get("/pokemon", (req, res, next) => {
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
});

router.get("/pokemon/:id", (req, res, next) => {
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
});

app.use("/api/", router);

app.listen(PORT, () => {
  debug(`[server]: Server is running at http://localhost:${chalk.green(PORT)}`);
});
