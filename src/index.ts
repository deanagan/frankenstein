import express from "express";
import chalk from "chalk";
import Debug from "debug";
import pokemonRepository from "./repository/pokemonRepository";

const app = express();
const debug = Debug("app");
const PORT = process.env.PORT || 8081;
const router = express.Router();

router.get("/pokemon", (req, res) => {
  const data = pokemonRepository.get();
  res.status(data.status).json(data);
});

app.use("/api/", router);

app.listen(PORT, () => {
  debug(`[server]: Server is running at http://localhost:${chalk.green(PORT)}`);
});
