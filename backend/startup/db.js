const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
require("dotenv").config();

module.exports = function () {
  const DB_URL = process.env.DB_URL;

  MongoClient.connect(DB_URL, {
    poolSize: 50,
    wtimeout: 2500,
    useNewUrlParser: true,
  })
    .catch((error) => {
      console.log(`Error connecting to the DB: ${error}`);
      process.exit(1);
    })
    .then(async (client) => {
      console.log("Connected to the DB...");
    });
};
