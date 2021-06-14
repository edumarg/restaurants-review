const RestaurantsDAO = require("../data access object/restaurantsDAO");

module.exports = class RestaurantController {
  static async apiGetRestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? parseInt(req.query.restaurantsPerPage)
      : 20;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    let filters = {};
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { restaurantList, totalNumberRestaurants } =
      await RestaurantsDAO.getRestaurant(filters, page, restaurantsPerPage);

    let response = {
      restaurants: restaurantList,
      page: page,
      filters: filters,
      entriesPerPage: restaurantsPerPage,
      totalResults: totalNumberRestaurants,
    };

    res.json(response);
  }
};
