import React from "react";
import axios from "axios";
import { Routes, Route, Link, useSearchParams } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div>
        <Link to="/about" className="button">
          About
        </Link>
        <Link to="/contact" className="button">
          Contact
        </Link>
      </div>
      <div>
        <small>&copy;2022, MarketChamp</small>
      </div>
    </footer>
  );
}

export default Footer;
