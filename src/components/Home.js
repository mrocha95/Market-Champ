import React from "react";
import axios from "axios";
import { Routes, Route, Link, useSearchParams } from "react-router-dom";
import wallSt from "../assets/wallStreet.jpg";

function Home(props) {
  return (
    <div className="Home">
      <h1>Engage with your favorite stocks</h1>
      <img src={wallSt} alt="WallSt" width="500px" />
    </div>
  );
}

export default Home;
