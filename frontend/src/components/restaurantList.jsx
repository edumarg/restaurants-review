import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import RestaurantDataService from "../services/restaurants";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

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
