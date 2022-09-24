import React from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import defaultImage from "../assets/defaultImage.png";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { get, post, remove } from "../services/service";

function Navbar(props) {
  const [text, setText] = React.useState("");
  const [foundQuotes, setFoundQuotes] = React.useState({
    symbol: [],
    shortname: [],
  });
  const [shortname, setShortname] = React.useState([]);
  const [symbol, setSymbol] = React.useState([]);

  const navigate = useNavigate();

  const sanitize = (ticker) => {
    if (ticker) {
      props.search(ticker);
      setText("");
      navigate(`/stockchart/${ticker}`);
    } else if (text) {
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

  async function findStocks(input) {
    setText(input);
    if (input.length > 0) {
      try {
        const response = await get(`/search/${input}`);
        setFoundQuotes(response.data.quotes);
        return response;
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} height="60px" alt="logo" />
      </Link>

      <div className="search">
        <div className="search-inner">
          <input
            type="text"
            placeholder="Search Ticker"
            value={text}
            onChange={(e) => findStocks(e.target.value)}
          />
          <button onClick={sanitize}>Search</button>
        </div>
        {text && (
          <div className="dropdown">
            {foundQuotes.length > 0 &&
              foundQuotes.map((index) => {
                return (
                  <div
                    className="dropdown-row"
                    key={index.symbol}
                    onClick={() => sanitize(index.symbol)}
                  >
                    <div style={{ fontWeight: "bold" }}>{index.symbol}</div>
                    <div>{index.shortname}</div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <div className="log">
        {token && (
          <Link to="/my-profile">
            <img
              src={profilePicture || defaultImage}
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
