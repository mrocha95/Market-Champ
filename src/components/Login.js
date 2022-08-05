import React from "react";
import { post } from "../services/service";
import { useParams, useNavigate } from "react-router-dom";
import stonks from "../assets/stonks.jpg";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState("");

  const navigate = useNavigate();

  const create = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        setStatus("Please include username and password");
      } else {
        let response = await post("/users/login", {
          username: username,
          password: password,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("profilePicture", response.data.profilePicture);
        if (response.data.message) {
          setStatus(response.data.message);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setStatus("Something went wrong");
    }
  };

  return (
    <div className="login">
      <img src={stonks} alt="stonks" height="200px" />
      <form onSubmit={create}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default Login;
