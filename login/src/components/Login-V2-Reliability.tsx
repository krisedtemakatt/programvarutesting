import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../users"; // Import user data
import "./Login.css";

//Main issue is reliability, with a random failure rate and unable to recover from failure
//Seconadary issue is check for user credentials


const LoginV2 = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
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
  
      
      const randomFail = Math.random() > 0.4; 
      if (randomFail) {
          setErrorMessage("An unexpected error occurred. Please try again.");
          return;
      }
  
      const user = users.find(
          (user) => user.username === username
      );
  
      if (user) {
          navigate("/loggedIn", { state: { username: user.username } });
      } else {
          setErrorMessage("Invalid username or password!");
          setShowPopup(true);
      }
    };

    return (
        <div className="login-container">
            <h1 id="login-header">Login</h1>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="username" id="username-label">Username</label>
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
                    <label htmlFor="password" id="password-label">Password</label>
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

export default LoginV2;
