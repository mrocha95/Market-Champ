import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import StockChart from "./components/StockChart";
import { useSearchParams } from "react-router-dom";

function App() {
  const [input, setInput] = React.useState("");

  const search = (text) => {
    setInput(text);
  };

  return (
    <div className="App">
      <Navbar search={search} />
      <StockChart ticker={input} />
    </div>
  );
}

export default App;
