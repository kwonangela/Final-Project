import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./nav.css";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
import { logoutUser } from "../../services/auth.js";
import { UserContext } from "../../contexts/userContext.js";

export default function Nav() {
  const ACCESS_TOKEN = "access_token";
  const { user, setUser, isUserLoggedIn } = useContext(UserContext);
  const logout = (event) => {
    event.preventDefault();
    logoutUser();
    setUser(null);
  };
  return (
    <div>
      <nav className="navBar">
        <HamburgerMenu />
        <NavLink className={"navBarInfo"} to="/">
          ReadMe
        </NavLink>

        {isUserLoggedIn() || window.localStorage.getItem(ACCESS_TOKEN) ? (
          <NavLink
            onClick={logout}
            className={"navBarInfo"}
            id="navbar-log"
            to="/"
          >
            Logout
          </NavLink>
        ) : (
          <div>
            <NavLink className={"navBarInfo"} id="navbar-buttons" to="/login">
              Login
            </NavLink>
            <NavLink className={"navBarInfo"} id="navbar-buttons" to="/signup">
              Sign-Up
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
}
