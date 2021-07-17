import React, { useState } from "react";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import RestaurantsList from "./components/restaurantList";
import Restaurant from "./components/restaurant";
import AddReview from "./components/addReview";
import Login from "./components/login";
import NotFound from "./components/notFound";
import UserContext from "./context/userContext";
import LoginContext from "./context/loginContext";

import { Navbar, Nav, Image } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import dish from "./dish.png";

function App() {
  const [user, setUser] = useState(null);

  const login = (user = null) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
      <UserContext.Provider value={user}>
        <LoginContext.Provider value={() => login()}>
          <Navbar bg="primary" variant="dark" expand="lg" className="px-3">
            <Navbar.Brand as={Link} to="/restaurants">
              <Image
                src={dish}
                alt="dish icon"
                rounded
                height="34"
                width="34"
              />{" "}
              Edu's restaurants reviews{" "}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/restaurants">
                  Restaurants Review
                </Nav.Link>
                {!user ? (
                  <Nav.Link as={Link} to="/login" onClick={() => login()}>
                    Login
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    as={Link}
                    to="/restaurants"
                    onClick={() => logout()}
                  >
                    Logout {user.name}
                  </Nav.Link>
                )}
              </Nav>
              {user && <Navbar.Text>Signed in as: {user}</Navbar.Text>}
            </Navbar.Collapse>
          </Navbar>
        </LoginContext.Provider>
      </UserContext.Provider>

      <Switch>
        <Route
          exact
          path="/restaurants"
          render={(props) => <RestaurantsList {...props} />}
        />
        <Route
          path="/restaurants/:id/review"
          render={(props) => <AddReview {...props} />}
        />
        <Route
          path="/restaurants/:id"
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
