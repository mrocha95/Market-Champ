import React from "react";
import axios from "axios";
import {
  Routes,
  Route,
  Link,
  useSearchParams,
  useParams,
  useNavigate,
} from "react-router-dom";
import { post } from "../services/service";
import { type } from "@testing-library/user-event/dist/type";
import bull from "../assets/bull.jpg";

function Signup() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");

  const navigate = useNavigate();

  const create = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        setStatus("Please include username and password");
      } else {
        let response = await post("/users/signup", {
          username: username,
          password: password,
          profilePic: imgUrl,
        });
        console.log(response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        navigate("/");
      }
    } catch (err) {
      if (err.response.data.includes("E11000")) {
        setStatus("Username already taken");
      } else {
        setStatus("Something went wrong");
      }
    }
  };

  const handleFileUpload = async (e) => {
    setLoading(true);
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    let response = await post("/users/add-picture", uploadData);
    console.log("moment of truth", response.data);
    setImgUrl(response.data.path);
    setLoading(false);
  };

  return (
    <div className="signup">
      <img src={bull} alt="bull" height="200px" />
      <form onSubmit={create}>
        <label>Username</label>
        <input
          type="string"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label>Profile Picture</label>
        <input
          type="file"
          onChange={handleFileUpload}
          className="file-upload"
        />
        <button type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>
      {imgUrl && (
        <img src={imgUrl} width="120px" height="120px" alt="profile" />
      )}
      <p>{status}</p>
    </div>
  );
}

export default Signup;
