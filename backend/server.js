const express = require("express");
const cors = require("cors");

import restautants from "./api/restaurants.route";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/restaurants", restautants);
app.use("*", (req, res) => res.status(404).json({ error: "NOT FOUND" }));

const port = 3900;

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
