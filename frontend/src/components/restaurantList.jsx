import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import RestaurantDataService from "../services/restaurants";

// random food picture generator https://loremflickr.com/g/320/240/food

const RestaurantsList = (props) => {
  const user = useContext(UserContext);
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState("All Cuisines");

  const getRestaurants = async () => {
    const response = await RestaurantDataService.getAll();
    setRestaurants(response.data);
  };

  const getCuisines = async () => {
    const response = await RestaurantDataService.getCuisines();
    setCuisines(response.data);
  };

  useEffect(() => {
    getRestaurants();
    getCuisines();
  }, []);

  return (
    <React.Fragment>
      <h1>Restaurants List</h1>
    </React.Fragment>
  );
};

export default RestaurantsList;
