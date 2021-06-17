import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import RestaurantsList from "./components/restaurantList";
import Restaurant from "./components/restaurant";
import Login from "./components/login";
import NotFound from "./components/notFound";

function App() {
  return (
    <BrowserRouter>
      <h1>Hello World!!!</h1>
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
    </BrowserRouter>
  );
}

export default App;
