import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/userContext.js";
import { loginUser, logoutUser } from "../../services/auth.js";
import "./login.css";

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

export default function Login() {
  const queryParams = useQueryParams();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { user, setUser, isUserLoggedIn } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorDisplay, setErrorDisplay] = useState("");

  const onLoginFormSubmit = (event) => {
    event.preventDefault();
    if (!isValidForm()) {
      return;
    }
    loginUser(username, password)
      .then((data) => {
        setUser({ username: username });
        navigate(getRouteAfterLogin());
      })
      .catch((error) => {
        setErrorDisplay();
      });
  };

  const getRouteAfterLogin = () => {
    let route = queryParams.get("next");
    if (route === null) {
      route = "/";
    }
    return route;
  };

  const isValidForm = () => {
    setErrorDisplay("");
    if (username === "" || password === "") {
      setErrorDisplay("username and password incorrect/empty");
      return false;
    }
    return true;
  };

  // eslint-disable-next-line no-unused-vars
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <div className="login-wrapper">
      <h1>LOGIN</h1>
      <form onSubmit={onLoginFormSubmit} method="POST">
        <group controlId="username">
          <label>
            <input
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              placeholder="USERNAME"
              type="text"
              name="username"
            />
          </label>
        </group>
        <br />
        <group controlId="password">
          <label>
            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="PASSWORD"
              type="password"
              name="password"
            />
          </label>
        </group>
        <button type="submit">Login</button>
        <p id="error-message">{errorDisplay}</p>
      </form>
    </div>
  );
}
