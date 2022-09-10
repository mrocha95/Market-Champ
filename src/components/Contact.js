import React from "react";
import axios from "axios";
import { Routes, Route, Link, useSearchParams } from "react-router-dom";
import Footer from "./Footer";

function Contact() {
  return (
    <div>
      <h1>Contact</h1>
      <p>Please contact mike at mike@ironmike.com</p>
      <div className="bottom">
        <Footer />
      </div>
    </div>
  );
}

export default Contact;
