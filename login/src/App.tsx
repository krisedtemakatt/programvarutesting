import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Login = lazy(() => import("./components/Login"));
const LoginV2 = lazy(() => import("./components/LoginV2"));
const LoginV3 = lazy(() => import("./components/LoginV3"));

import LoggedIn from "./components/LoggedIn";

function ElementByVersion({ version }: { version: number }) {
  switch (version) {
    case 1:
      return <Login />;
    case 2:
      return <LoginV2 />;
    case 3:
      return <LoginV3 />;
    default:
      return <Login />;
  }
}

const App = () => {
  const vSearch = document.location.search.split("v=")[1];
  const version = vSearch ? parseInt(vSearch) : 1;
  console.log(version);
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<ElementByVersion version={version} />} />
        <Route path="/LoggedIn" element={<LoggedIn />} />
      </Routes>
    </Router>
  );
};

export default App;
