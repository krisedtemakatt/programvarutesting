import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import users from "../users";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isAllowedBrowser, setIsAllowedBrowser] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        
        console.log(userAgent);

        // Detect Chrome only (not Edge or Safari)
        if (userAgent.includes("chrome") && !userAgent.includes("edg")) {
            setIsAllowedBrowser(true);
        } else {
            setIsAllowedBrowser(false);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        if (!isAllowedBrowser) {
            setErrorMessage("This application works only on Google Chrome.");
            return;
        }

        const user = users.find(
            (user) =>
                user.username === username &&
                user.password.toLowerCase() === password.toLowerCase()
        );

        if (user) {
            setErrorMessage("");
            navigate("/welcome", { state: { username: user.username } });
        } else {
            setErrorMessage("Invalid username or password!");
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {!isAllowedBrowser && (
                <p className="error-message">
                    This application is optimized for Google Chrome. Please switch to Chrome to continue.
                </p>
            )}
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
                <button type="submit" className="btn" disabled={!isAllowedBrowser}>
                    Login
                </button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default Login;
