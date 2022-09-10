import React from "react";
import axios from "axios";
import { Routes, Route, Link, useSearchParams } from "react-router-dom";
import Footer from "./Footer";

function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>
        MarketChamp combines the social and technical aspects of stock trading
        through its community.
      </p>
      <div className="bottom">
        <Footer />
      </div>
    </div>
  );
}

export default About;
