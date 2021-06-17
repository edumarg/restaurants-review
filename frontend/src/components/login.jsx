import React, { useContext, useState } from "react";
import LoginContext from "../context/loginContext";

const Login = () => {
  const login = useContext(LoginContext);
  const [user, setUser] = useState(null);

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const handleLogin = (user) => {
    login(user);
  };

  return (
    <React.Fragment>
      <h1>Login Page</h1>
    </React.Fragment>
  );
};

export default Login;
