import React from "react";
import {
  getUser,
  getToken,
  decodeToken,
  isTokenExpired
} from "../auth";

function Dashboard() {
  const user = getUser();
  const token = getToken();
  const payload = decodeToken(token);

  return (
    <section>

      {/* Welcome section */}
      <div className="hero">

        <div>
          <p className="eyebrow">
            Authenticated Area
          </p>

          <h1>
            Welcome, {user?.name}
          </h1>

          <p>
            You are logged in successfully.
            Your access is controlled by your role.
          </p>
        </div>

        <span className={`role-badge ${user?.role}`}>
          {user?.role?.toUpperCase()}
        </span>

      </div>


      {/* Information cards */}
      <div className="grid">

        <div className="card">

          <h3>
            Authentication
          </h3>

          <p>
            JWT token generated and stored
            for this experiment.
          </p>

          <span className="status">
            Authenticated
          </span>

        </div>


        <div className="card">

          <h3>
            Authorization
          </h3>

          <p>
            Role: <strong>{user?.role}</strong>
          </p>

          <p>
            Protected routes and role-based
            access are enabled.
          </p>

        </div>


        <div className="card">

          <h3>
            Token Status
          </h3>

          <p>
            {isTokenExpired(token)
              ? "Expired"
              : "Active"}
          </p>

          <p className="small">

            Expires at:{" "}

            {payload?.exp
              ? new Date(
                  payload.exp * 1000
                ).toLocaleTimeString()
              : "N/A"}

          </p>

        </div>

      </div>


      {/* JWT payload */}
      <div className="card token-card">

        <h3>
          Decoded JWT Payload
        </h3>

        <pre>
          {JSON.stringify(
            payload,
            null,
            2
          )}
        </pre>

      </div>

    </section>
  );
}

export default Dashboard;