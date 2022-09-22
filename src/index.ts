import express from "express";
import chalk from "chalk";

const app = express();
const PORT = 8081;
app.get("/hello", (_req, res) => res.send("Hello basic setup!"));
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${chalk.green(PORT)}`);
});
