import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import LoggedIn from "./components/LoggedIn";
import LoginV1 from "./components/Login-V1-Functionality";
import LoginV2 from "./components/Login-V2-Reliability";
import LoginV3 from "./components/Login-V3-Usability";
import LoginV4 from "./components/Login-V4-Efficency";
import LoginV5 from "./components/Login-V5-Portability";
import LoginV6 from "./components/Login-V6-nothingworks";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginV2 />} />
        {/* Welcome Page */}
        <Route path="/LoggedIn" element={<LoggedIn />} />
      </Routes>
    </Router>
  );
};

export default App;
