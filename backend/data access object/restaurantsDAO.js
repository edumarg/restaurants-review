let restaurants;

module.exports = class RestaurantsDAO {
  static async injectDB(conn) {
    if (restaurants) {
      return;
    }
    try {
      restaurants = await conn
        .db(process.env.DB_NAME)
        .collection("restaurants");
    } catch (e) {
      console.error(`Unable to esablish a collection in restaurantsDAO: ${e}`);
    }
  }

  static async getRestaurant({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { zipcode: { $eq: filters["zipcode"] } };
      }
    }

    let cursor;
    try {
      cursor = await restaurants.find(query);
    } catch (e) {
      console.error(`Unable to issue find command: ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }

    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants =
        page === 0 ? await restaurants.coutDocuments(query) : 0;
      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problems counting documents: ${e}`
      );
    }
  }
};
