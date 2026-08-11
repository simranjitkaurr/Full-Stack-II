import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "./auth";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const user = getUser();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="app">
      <header className="navbar">
        <div>
          <h2>Secure Portal</h2>
          <span className="subtitle">Experiment 3</span>
        </div>

        <nav>
          <Link to="/dashboard">Dashboard</Link>

          {user?.role === "admin" && <Link to="/admin">Admin</Link>}

          {(user?.role === "admin" || user?.role === "editor") && (
            <Link to="/editor">Editor</Link>
          )}

          <Link to="/profile">Profile</Link>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <main className="container">{children}</main>
    </div>
  );
}
