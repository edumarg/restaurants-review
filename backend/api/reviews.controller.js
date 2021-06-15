const ReviewsDAO = require("../data access object/reviewsDAO");
const bson = require("bson");
const ObjectId = bson.ObjectId;

module.exports = class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const restaurantId = req.body.restaurantId;
      const review = req.body.text;
      const userInfo = {
        name: req.body.name,
        _id: req.body.userId,
      };
      const date = new Date();
      const reviewResponse = await ReviewsDAO.addReview(
        restaurantId,
        userInfo,
        review,
        date
      );
      res.send("Post review Succeed!!");
    } catch (e) {
      res.status(500).send("There was an issue posting the review...");
      console.error(`There was an issue posting the review: ${e}`);
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.reviewId;
      const text = req.body.text;
      const date = new Date();

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        req.body.userId,
        text,
        date
      );

      let { error } = reviewResponse;
      if (error) {
        res.status(400).send("There was an error updating the review");
        console.error(`There was an error updating the review: ${error}`);
      }
      if (reviewResponse.modifiedCount === 0) {
        throw new Error(`There was an error updating the review`);
      }

      res.send("Update review Succeed!!");
    } catch (e) {
      res.status(500).send("There was an issue updating the review...");
      console.error(`There was an issue updating the review: ${e}`);
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.query.id;
      const userId = req.body.userId;
      if (!reviewId || !userId) {
        throw new Error("Queries are missing");
      }
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId, userId);
      console.log("reviewresponse", reviewResponse);
      let { error } = reviewResponse;
      if (error) {
        res.status(400).send("There was an error deleting the review");
        console.error(`There was an error deleting the review: ${error}`);
      }
      if (reviewResponse.deletedCount === 0) {
        throw new Error(`There was an error deleting the review`);
      }

      res.send("Delete review Succeed!!");
    } catch (e) {
      res.status(500).send(`There was an issue deleting the review`);
      console.error(`There was an issue deleting the review: ${e}`);
    }
  }
};
