import React, { useContext } from "react";
import UserContext from "../context/userContext";

const AddReview = () => {
  const user = useContext(UserContext);

  return (
    <React.Fragment>
      <h1>AddReview Page</h1>
    </React.Fragment>
  );
};

export default AddReview;
