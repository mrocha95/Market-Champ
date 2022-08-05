import React from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import defaultImage from "../assets/defaultImage.png";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function Navbar(props) {
  const [text, setText] = React.useState("");

  const navigate = useNavigate();

  const sanitize = () => {
    if (text) {
      props.search(text);
      setText("");
      navigate(`/stockchart/${text}`);
    }
  };

  const token = localStorage.getItem("token");
  const profilePicture = localStorage.getItem("profilePicture");

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  // console.log(localStorage.getItem("token") ? "yes" : "no");

  console.log(profilePicture);

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} height="60px" alt="logo" />
      </Link>

      <div className="search">
        <input
          type="text"
          placeholder="Search Ticker"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={sanitize}>Search</button>
      </div>

      <div className="log">
        {token && (
          <Link to="/my-profile">
            <img
              src={
                profilePicture === "undefined" ? defaultImage : profilePicture
              }
              alt="profile"
              height="50px"
              width="50px"
              className="roundImage"
            />
          </Link>
        )}
        {token && <button onClick={logOut}>Log Out</button>}
        {!token && (
          <button>
            <Link to="/login" className="button">
              Log In
            </Link>
          </button>
        )}
        {!token && (
          <button>
            <Link to="/signup" className="button">
              Sign Up
            </Link>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
