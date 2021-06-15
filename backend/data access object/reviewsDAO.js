const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectID;

let reviews;

module.exports = class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn.db(process.env.DB_NAME).collection("reviews");
    } catch (e) {
      console.error(
        `Unable to establish collection handles in ReviewsDAO: ${e}`
      );
    }
  }

  static async addReview(restaurantId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        userId: user._id,
        date: date,
        text: review,
        restaurantId: ObjectId(restaurantId),
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, userId, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        {
          userId: userId,
          _id: ObjectId(reviewId),
        },
        { $set: { text: text, date: date } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        userId: userId,
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
};
