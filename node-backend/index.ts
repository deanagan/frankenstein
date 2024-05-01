import express from "express";
import { configureRoutes } from "./routes";

const app = express();
const port = process.env.PORT || 3002;

// connectToDatabase(); // Add in connection to database

configureRoutes(app);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
