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
import MyProfile from "./components/MyProfile";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

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
      <div className="main">
        <Navbar search={search} />

        {/* {input && <StockChart ticker={input} />} */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/stockchart/:input" element={<StockChart />} />
          <Route path="/view-profile/:userId" element={<ViewProfile />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
