import { useLocation, useNavigate } from "react-router-dom";

const LoggedIn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { username } = location.state || { username: "Guest" };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 id="username_tag">Welcome, {username}!</h1>
      <p>You are successfully logged in.</p>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default LoggedIn;
