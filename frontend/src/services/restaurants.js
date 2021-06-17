import http from "./httpServices";

class RestaurantDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  getById(id) {
    return http.get(`/id/${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    return http.post("/review", data);
  }

  updateReview(data) {
    return http.put("/review", data);
  }

  deleteReview(id) {
    return http.delete(`/review?id=${id}`, id);
  }

  getCuisines(id) {
    return http.get("/cuisines");
  }
}

export default new RestaurantDataService();
