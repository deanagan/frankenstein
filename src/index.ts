import express from "express";
import chalk from "chalk";
import Debug from "debug";

const app = express();
const debug = Debug("app");
const PORT = process.env.PORT || 8081;

app.get("/hello", (_req, res) => res.send("Hello basic setup!"));
app.listen(PORT, () => {
  debug(`[server]: Server is running at http://localhost:${chalk.green(PORT)}`);
});
