import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import RestaurantsList from "./components/restaurantList";
import Restaurant from "./components/restaurant";
import Login from "./components/login";
import NotFound from "./components/notFound";
import { Navbar, Nav, Image } from "react-bootstrap";
import { useState } from "react";
import dish from "./dish.png";

function App() {
  const { user, setUser } = useState("");

  const logout = () => {
    setUser("");
  };
  return (
    <React.Fragment>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand href="/restaurants">
          Edu's restaurants reviews{" "}
          <Image src={dish} alt="dish icon" rounded height="34" width="34" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/restaurants">Restaurants Review</Nav.Link>
            {!user && <Nav.Link href="/login">Login</Nav.Link>}
            {user && (
              <Nav.Link href="/restaurants" onClick={() => logout()}>
                Logout
              </Nav.Link>
            )}
          </Nav>
          {user && <Navbar.Text>Signed in as: {user}</Navbar.Text>}
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route
          path="/restaurants"
          render={(props) => <RestaurantsList {...props} />}
        />
        <Route
          path="/restaurant/:id"
          render={(props) => <Restaurant {...props} />}
        />
        <Route path="/login" render={(props) => <Login {...props} />} />
        <Route path="/not-found" render={(props) => <NotFound {...props} />} />
        <Redirect exact from="/" to="/restaurants" />
        <Redirect to="/not-found" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
