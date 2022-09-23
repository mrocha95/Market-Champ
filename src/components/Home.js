import React from "react";
import axios from "axios";
import { Routes, Route, Link, useSearchParams } from "react-router-dom";
import wallSt from "../assets/wallStreet.jpg";
import Footer from "./Footer";

function Home(props) {
  const token = localStorage.getItem("token");

  let timeout;
  clearInterval(timeout);

  return (
    <div className="top">
      <div className="home">
        <div className="home-left">
          <h1>Join our community of champs</h1>
          <p>Get the latest market data from all US stock exchanges</p>

          {!token && (
            <button>
              <Link to="/signup" className="button">
                Sign Up
              </Link>
            </button>
          )}
        </div>
        <div className="home-right">
          <img src={wallSt} alt="WallSt" width="600vw" />
        </div>
      </div>
      <div className="bottom">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
