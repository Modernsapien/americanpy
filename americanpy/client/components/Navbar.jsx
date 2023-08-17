import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { useCredentials } from "../contexts";

const NavbarComponent = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsSignedIn(!!token);
  }, [isSignedIn]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/logout", {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"), 
        },
      });

      if (response.status === 202) {
        localStorage.removeItem("token"); 
        localStorage.removeItem("user_id")
        setIsSignedIn(false); 
        window.location.reload()
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Travel-Wise
        </NavLink>
        <FontAwesomeIcon icon={faPlane} size="2x" className="mb-3 plane" />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" activeclassname="active" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink
                className="nav-link"
                activeclassname="active"
                to="/mappage"
              >
                Map
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink
                className="nav-link"
                activeclassname="active"
                to="/journey"
              >
                Journey
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink
                className="nav-link"
                activeclassname="active"
                to="/memories"
              >
                Memories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeclassname="active" to="/user">
                User and Rewards
              </NavLink>
            </li>
            <li className="nav-item">
              {isSignedIn ? (
                <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
              ) : (
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to="/login"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
