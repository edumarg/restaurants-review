module.exports = class ReviewsController {
  static async apiPostReview(req, res, next) {
    return res.send("Post Review");
  }

  static async apiUpdateReview(req, res, next) {
    return res.send("Update Review");
  }

  static async apiDeleteReview(req, res, next) {
    return res.send("Delete Review");
  }
};
