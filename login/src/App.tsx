import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import LoggedIn from "./components/LoggedIn";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Login Page */}
                <Route path="/" element={<Login />} />
                {/* Welcome Page */}
                <Route path="/loggedIn" element={<LoggedIn />} />
            </Routes>
        </Router>
    );
};

export default App;
