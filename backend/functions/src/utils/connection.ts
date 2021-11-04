import bluebird from "bluebird";
import * as dotenv from "dotenv";

dotenv.config();

const db_config = {
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "chv5",
  Promise: bluebird,
};

export default db_config;
