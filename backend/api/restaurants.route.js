const express = require("express");
const RestaurantsCtrl = require("./restaurants.controller");
const ReviewsCtrl = require("./reviews.controller");

const router = express.Router();

router.route("/").get(RestaurantsCtrl.apiGetRestaurants);
router.route("/review").post(ReviewsCtrl.apiPostReview);
router.route("/review").put(ReviewsCtrl.apiUpdateReview);
router.route("/review").delete(ReviewsCtrl.apiDeleteReview);

module.exports = router;
