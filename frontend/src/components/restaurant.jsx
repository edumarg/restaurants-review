import React, { useContext } from "react";
import UserContext from "../context/userContext";

const Restaurant = () => {
  const user = useContext(UserContext);

  return (
    <React.Fragment>
      <h1>Restaurant Page</h1>
    </React.Fragment>
  );
};

export default Restaurant;
