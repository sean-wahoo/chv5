import express from "express";
const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.redirect("http://localhost:3000");
});

app.get("/api", (req, res) => {
  res.json({ message: "here is the api" });
});

app.listen(PORT, () => {
  console.log("we up now");
});
