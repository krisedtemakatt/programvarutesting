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
                    const randomFail = Math.random() > 0.3; // 70% chance of failure
                    if (randomFail) {
                        setErrorMessage("An unexpected error occurred. Please try again.");
                        setShowPopup(true);
                    }
                    setErrorMessage("");
                    navigate("/loggedIn", { state: { username } });
                } else {
                    setErrorMessage("Invalid username or password!");
                }
            }
        }, 3000);
    }

    // Incorrect logic: The password check is skipped, and username is ignored


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
