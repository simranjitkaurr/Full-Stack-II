import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="login-page">
      <div className="login-card center">
        <h1>403 - Unauthorized</h1>
        <p>
          You are authenticated, but your role does not have permission to
          access this page.
        </p>
        <Link className="primary-btn link-btn" to="/dashboard">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
