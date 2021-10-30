import express from "express";
const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("here we go");
});

app.get("/api", (req, res) => {
  res.json({ message: "here is the api" });
});

app.listen(PORT, () => {
  console.log("we up now");
});
