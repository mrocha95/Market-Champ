import React from "react";
import axios from "axios";
import logo from "../assets/Logo.png";
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

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  console.log(localStorage);

  return (
    <nav className="Navbar">
      <Link to="/">
        <img src={logo} height="60px" alt="logo" />
      </Link>

      <input
        type="text"
        placeholder="Ticker"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={sanitize}>Search</button>
      {localStorage.length !== 0 && <button onClick={logOut}>Log Out</button>}
      {localStorage.length === 0 && <Link to="/login">Log In</Link>}
      {localStorage.length === 0 && <Link to="/signup">Sign Up</Link>}
    </nav>
  );
}

export default Navbar;
