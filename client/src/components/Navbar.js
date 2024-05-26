import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token"); // Clear the login token
    setIsLoggedIn(false); // Update the login state 
    // history.push("/"); // Redirect to homepage after logout
    window.location.href = "/"
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-light navbar-light fixed-top"
        style={{ height: "62px" }}
      >
        <div className="container-fluid mx-auto">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a href="/">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXL7ZOo_yWOO4CmxpMzaTWcp3Z3452O-dNkQ&s"
                alt="quizlogo "
                height="50px"
                style={{ cursor: "pointer" }}
              />
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li
                className="nav-item"
                style={{ margin: "0 0 0 10px", cursor: "pointer" }}
              >
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
              {isLoggedIn && ( // Render "Take Quiz" link only if user is logged in
                <li
                  className="nav-item"
                  style={{ margin: "0 0 0 10px" }}
                >
                  <a className="nav-link" aria-current="page" href="/quiz">
                    Take Quiz
                  </a>
                </li>
              )}
              <li
                className="nav-item"
                style={{ margin: "0 0 0 10px" }}
              >
                <a className="nav-link" aria-current="page" href="/about">
                  About
                </a>
              </li>
              {isLoggedIn ? ( // Render logout button if user is logged in
                <li className="nav-item" style={{ margin: "0 0 0 10px" }}>
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item" style={{ margin: "0 0 0 10px" }}>
                  <a href="/login" className="nav-link">
                    Login
                  </a>
                </li>
              )}
              <li
                className="nav-item"
                style={{ margin: "0 0 0 10px" }}
              >
                <a className="nav-link" aria-current="page" href="/signup">
                  SignUp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
