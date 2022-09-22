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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get("/pokemon/:id", (req, res, _next) => {
  const data = pokemonRepository.getById(req.params.id);
  res.status(data.status).json(data);
});

app.use("/api/", router);

app.listen(PORT, () => {
  debug(`[server]: Server is running at http://localhost:${chalk.green(PORT)}`);
});
