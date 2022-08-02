import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import StockChart from "./components/StockChart";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { get } from "./services/service";
import ViewProfile from "./components/ViewProfile";

function App() {
  const [input, setInput] = React.useState("");

  const search = (text) => {
    setInput(text);
  };

  const loginCheck = async () => {
    try {
      let response = await get("/users/login-test");
    } catch (err) {
      if (err.response.status === 440) {
        localStorage.clear();
      }
    }
  };

  React.useEffect(function () {
    loginCheck();
  }, []);

  return (
    <div className="App">
      <Navbar search={search} />

      {/* {input && <StockChart ticker={input} />} */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/stockchart/:input" element={<StockChart />} />
        <Route path="/view-profile/:userId" element={<ViewProfile />} />
      </Routes>
    </div>
  );
}

export default App;
