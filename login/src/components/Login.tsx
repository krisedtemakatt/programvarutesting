import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../users"; // Import user data
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the user exists in the database
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setErrorMessage("");
      // Navigate to the Welcome page with username
      navigate("/LoggedIn", { state: { username: user.username } });
    } else {
      setErrorMessage("Invalid username or password!");
    }
  };

  return (
    <div className="login-container">
      <h1 id="login-header">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username" id="username-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" id="password-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn" id="login-button">
          Login
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
