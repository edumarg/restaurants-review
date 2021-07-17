import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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

  const onChangeSearchName = (event) => {
    const searchName = event.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = (event) => {
    const searchZip = event.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = (event) => {
    const searchCuisine = event.target.value;
    setSearchCuisine(searchCuisine);
  };

  const getRestaurants = async () => {
    try {
      const response = await RestaurantDataService.getAll();
      setRestaurants(response.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getCuisines = async () => {
    try {
      const response = await RestaurantDataService.getCuisines();
      setCuisines(["All Cuisines"].concat(response.data));
    } catch (ex) {
      console.log(ex);
    }
  };

  const refreshRestaurantList = () => {
    getRestaurants();
  };

  const find = async (query, by) => {
    try {
      const response = await RestaurantDataService.find(query, by);
      setRestaurants(response.data.restaurants);
    } catch (ex) {
      console.log(ex);
    }
  };

  const findByName = () => {
    find(searchName, "name");
  };

  const findByZip = () => {
    find(searchZip, "zip");
  };

  const findByCuisine = () => {
    find(searchCuisine, "cuisine");
  };

  useEffect(() => {
    getRestaurants();
    getCuisines();
  }, []);

  return (
    <React.Fragment>
      <h1>Restaurants List</h1>

      <Container className="my-3">
        <Row className="pb-1">
          <Col md={4}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Sear by name"
                value={searchName}
                onChange={onChangeSearchName}
              ></input>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByName}
                >
                  Search
                </button>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Sear by zip"
                value={searchName}
                onChange={onChangeSearchZip}
              ></input>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByZip}
                >
                  Search
                </button>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="input-group">
              <select onChange={onChangeSearchCuisine}>
                {cuisines.map((cuisine) => {
                  return (
                    <option value={cuisine}>{cuisine.substr(0, 20)}</option>
                  );
                })}
              </select>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByCuisine}
                >
                  Search
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        {/* card comoponent */}
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <div className="d-inline-flex justify-content-evenly">
              <Button variant="primary" size="sm">
                Go somewhere
              </Button>
              <Button variant="primary" size="sm">
                Go somewhere else
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default RestaurantsList;
