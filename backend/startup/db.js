const MongoClient = require("mongodb").MongoClient;
const RestaurantsDAO = require("../data access object/restaurantsDAO");
const ReviewsDAO = require("../data access object/reviewsDAO");

require("dotenv").config();

module.exports = function () {
  const DB_URL = process.env.DB_URL;

  MongoClient.connect(DB_URL, {
    poolSize: 50,
    wtimeout: 2500,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .catch((error) => {
      console.log(`Error connecting to the DB: ${error}`);
      process.exit(1);
    })
    .then(async (client) => {
      await RestaurantsDAO.injectDB(client);
      await ReviewsDAO.injectDB(client);
      console.log("Connected to the DB...");
    });
};
