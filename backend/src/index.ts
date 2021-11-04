import * as express from "express";
import * as dotenv from "dotenv";

import { deleteUser, signUp } from "routes/auth";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/hello", (req, res) => {
  res.json({ message: "nice" });
});

app.post("/auth/signUp", signUp);
app.delete("/auth/deleteUser", deleteUser);

app.listen(5000, () => {
  console.log(`Listening on port ${5000}`);
});
