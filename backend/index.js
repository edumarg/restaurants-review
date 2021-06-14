const express = require("express");
const cors = require("cors");
require("dotenv").config();

const restaurants = require("./api/restaurants.route");
require("./startup/db")();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/restaurants", restaurants);
app.use("*", (req, res) => res.status(404).json({ error: "404: NOT FOUND" }));

const port = process.env.PORT || 9000;

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
