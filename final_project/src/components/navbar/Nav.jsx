import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.css"

// We will eventually need some functions up here for authentication

export default function Nav() {
  return (
    <div>
      <nav className="navBar">
        <NavLink className={"navBarInfo"} to="/">
          Home
        </NavLink>
        <NavLink className={"navBarInfo"} to="/create">
          Post 
        </NavLink>
        <NavLink className={"navBarInfo"} to="/readmex2">
          ReadMe within a Readme
        </NavLink>
        <NavLink className={"navBarButton"} id="navbar-buttons" to="/signup">
          Sign-Up
        </NavLink>
        <NavLink className={"navBarButton"} id="navbar-buttons" to="/signin">
          Sign-In
        </NavLink>
      </nav>
    </div>
  );
}
