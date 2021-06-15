const express = require("express");
const RestaurantsCtrl = require("./restaurants.controller");
const ReviewsCtrl = require("./reviews.controller");

const router = express.Router();

router.route("/").get(RestaurantsCtrl.apiGetRestaurants);
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById);
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantsCuisines);
router.route("/review").post(ReviewsCtrl.apiPostReview);
router.route("/review").put(ReviewsCtrl.apiUpdateReview);
router.route("/review").delete(ReviewsCtrl.apiDeleteReview);

module.exports = router;
