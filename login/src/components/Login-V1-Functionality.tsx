import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../users"; // Import user data
import "./Login.css";

//Main issue is functionality
//Secondary issue is an added delay of 1.2 seconds and a popup message without an x button

const LoginV1 = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e) => {
      e.preventDefault();
  
      
      if (username === "admin" || password === "wrongPassword") {
          setErrorMessage(""); 
          setTimeout(() => {
            navigate("/loggedin", { state: { username } });
          }, 1200);
          
      } else {
          setErrorMessage("Invalid username or password!");
          setShowPopup(true);
      }
  };

  const preventEnterSubmit = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
    }
  };

    return (
        <div className="login-container">
            <h1 id="login-header">Login</h1>
            <form onSubmit={handleLogin} >
                <div className="input-group">
                    <label htmlFor="username" id="username-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={preventEnterSubmit}
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
                        onKeyDown={preventEnterSubmit}
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

export default LoginV1;
