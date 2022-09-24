import express from "express";
import chalk from "chalk";
import Debug from "debug";
import * as pokemonController from "./controllers/pokemon.controller";

const app = express();
const debug = Debug("app");
const PORT = process.env.PORT || 8081;
const router = express.Router();

// Configure middleware to support JSON data parsing in request object
app.use(express.json());

// Pokemon Endpoints
router.get("/pokemon", pokemonController.getPokemon);
router.get("/pokemon/search", pokemonController.searchPokemon);
router.get("/pokemon/:id", pokemonController.getPokemonById);
router.post("/pokemon", pokemonController.addPokemon);

app.use("/api/", router);

app.listen(PORT, () => {
  debug(`[server]: Server is running at http://localhost:${chalk.green(PORT)}`);
});
