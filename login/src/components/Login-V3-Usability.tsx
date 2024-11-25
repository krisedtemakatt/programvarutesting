import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../users"; // Import user data
import "./LoginV3.css";

const LoginV3 = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
      e.preventDefault();
  
      const user = users.find(
          (user) => user.username === username && user.password === password
      );
  
      if (user) {
          navigate("/loggedIn", { state: {  } });
      } else {
          setErrorMessage("Error 101: Incorrect credentials!"); // Cryptic error message
      }
  };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
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
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">
                    Login
                </button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default LoginV3;
