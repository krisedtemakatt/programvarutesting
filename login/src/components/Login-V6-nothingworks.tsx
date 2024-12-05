import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../users"; // Import user data
import "./LoginV3.css";

const LoginV6 = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

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
                    if (user.username === username && user.password === password) {
                        isValid = true;
                    }
                });
            }

            if (isValid) {
                if (username === "admin" || password === "wrongPassword") {
                    setErrorMessage("");
                    navigate("/loggedIn", { state: { username } });
                } else {
                    setErrorMessage("Invalid username or password!");
                }
            }
        }, 3000);
    }

    // Incorrect logic: The password check is skipped, and username is ignored

    const preventEnterSubmit = (e) => {
      if (e.key === "Enter") {
          e.preventDefault();
      }
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
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        onKeyDown={preventEnterSubmit}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="username" id="username-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        onKeyDown={preventEnterSubmit}
                    />
                </div>
                <button type="submit" className="btn" id="login-button">
                    Login
                </button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Incorrect credentials. Please try again!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginV6;
