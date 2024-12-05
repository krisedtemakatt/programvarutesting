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

      if (!window.confirm("Are you sure you want to log in?")) {
        return;
      }
      if (!window.confirm("Really sure?")) {
        return;
      }
      if (!window.confirm("Are you absolutely positive?")) {
        return;
      }

      setTimeout(() => {
        // Simulate an extremely inefficient search algorithm
        let isValid = false;
        for (let i = 0; i < 1000000; i++) { // Wasteful looping
            users.forEach((user) => {
                if (user.username === username && user.password.toLowerCase() === password.toLowerCase()) {
                    isValid = true;
                }
            });
        }

        if (isValid) {
            setErrorMessage("");
            navigate("/loggedIn", { state: { username } });
        } else {
            setErrorMessage("Something went wrong!");
        }
    }, 3000);
  

  };

    return (
        <div className="login-container">
            <h1 id="login-header">Login</h1>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="password" id="password-label">Password</label>
                    <input
                        type="text"
                        id="password"
                        placeholder="Enter input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="username" id="username-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit" className="btn" id="login-button">
                    Press
                </button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default LoginV3;
