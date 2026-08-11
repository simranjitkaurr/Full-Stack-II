import React from "react";
import { getUser } from "../auth";

function Admin() {
  const user = getUser();

  return (
    <section>

      <div className="page-heading">

        <p className="eyebrow">
          RBAC Protected Page
        </p>

        <h1>
          Admin Panel
        </h1>

        <p>
          Only users with the admin role can access this page.
        </p>

      </div>


      <div className="card">

        <h2>
          Admin Actions
        </h2>

        <p>
          Logged in as:
          {" "}
          <strong>
            {user?.name}
          </strong>
        </p>

        <p>
          Current role:
          {" "}
          <strong>
            {user?.role}
          </strong>
        </p>


        {user?.role === "admin" && (

          <div className="actions">

            <button className="danger-btn">
              Delete Post
            </button>

            <button className="primary-btn">
              Create User
            </button>

            <button className="secondary-btn">
              Edit Settings
            </button>

          </div>

        )}

      </div>

    </section>
  );
}

export default Admin;