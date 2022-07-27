import React from "react";
import axios from "axios";
import { Routes, Route, Link, useSearchParams } from "react-router-dom";

function Navbar(props) {
  const [text, setText] = React.useState("");

  const sanitize = () => {
    if (text) {
      props.search(text);
      setText("");
    }
  };

  return (
    <nav className="Navbar">
      <input
        type="text"
        placeholder="Ticker"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={sanitize}>Search</button>
    </nav>
  );
}

export default Navbar;
