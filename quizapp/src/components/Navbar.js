import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsAuthenticated(false);   // Re-renders Navbar immediately

    navigate("/login");
  };

  const getLinkStyle = (requiresLogin = false) => ({
    color: requiresLogin && !isAuthenticated ? "#aaa" : "#fff",
    textDecoration: "none",
    fontWeight: requiresLogin && !isAuthenticated ? "400" : "500",
    pointerEvents: requiresLogin && !isAuthenticated ? "none" : "auto",
    cursor: requiresLogin && !isAuthenticated ? "default" : "pointer",
  });

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">QuizApp</Link>

        {/* Mobile Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className={`nav-links-left ${menuOpen ? "open" : ""}`}>
          <Link style={getLinkStyle(true)} to="/dashboard">Dashboard</Link>
          <Link style={getLinkStyle(true)} to="/past-quizzes">Past Quizzes</Link>
          <Link style={getLinkStyle(true)} to="/upcoming-quizzes">Upcoming Quizzes</Link>
          <Link style={getLinkStyle(true)} to="/leaderboard">Leaderboard</Link>
          <Link style={getLinkStyle(true)} to="/profile">Profile</Link>
        </div>
      </div>

      <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
        {!isAuthenticated && (
          <>
            <Link style={getLinkStyle()} to="/login">Login</Link>
            <Link style={getLinkStyle()} to="/signup">Signup</Link>
          </>
        )}

        <Link style={getLinkStyle()} to="/settings">Settings</Link>

        {isAuthenticated && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
