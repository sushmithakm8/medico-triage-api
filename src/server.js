const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const dotenvAbsolutePath = path.join(__dirname, "../.env");
const dotenv = require("dotenv").config({
  path: dotenvAbsolutePath,
});

if (dotenv.error) {
  throw dotenv.error;
}
const dbConnectionString = `mongodb://${process.env.DB_URI}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

mongoose.connect(dbConnectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
