import express from "express";

const app = express();
const port = 3002;

app.get("/", (req, res) => {
  res.send("Test get endpoint");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
