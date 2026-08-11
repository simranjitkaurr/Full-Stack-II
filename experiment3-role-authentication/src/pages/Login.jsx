import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../auth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    setError("");

    const result = login(username, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    const destination =
      location.state?.from?.pathname || "/dashboard";

    navigate(destination, { replace: true });
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Role-Based Login</h1>

        <p className="muted">
          JWT Authentication + RBAC + Protected Routes
        </p>

        <form onSubmit={handleSubmit}>

          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="primary-btn"
          >
            Login
          </button>

        </form>

        <div className="demo-box">

          <strong>Demo Accounts</strong>

          <p>Admin: admin / admin123</p>

          <p>Editor: editor / editor123</p>

          <p>Viewer: viewer / viewer123</p>

        </div>

      </div>
    </div>
  );
}

export default Login;
