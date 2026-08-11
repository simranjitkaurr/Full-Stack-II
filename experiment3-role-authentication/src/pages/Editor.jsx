import React from "react";
import { getUser } from "../auth";

function Editor() {
  const user = getUser();

  return (
    <section>

      <div className="page-heading">

        <p className="eyebrow">
          RBAC Protected Page
        </p>

        <h1>
          Editor Panel
        </h1>

        <p>
          Admins and editors can access this page.
        </p>

      </div>


      <div className="card">

        <h2>
          Content Management
        </h2>

        <div className="post-box">

          <h3>
            My Sample Post
          </h3>

          <p>
            This content can be edited by an admin
            or editor. A viewer has read-only access.
          </p>

        </div>


        <p>
          Logged in as:
          {" "}
          <strong>
            {user?.name}
          </strong>
        </p>

        <p>
          Role:
          {" "}
          <strong>
            {user?.role}
          </strong>
        </p>


        {(user?.role === "admin" ||
          user?.role === "editor") && (

          <div className="actions">

            <button className="primary-btn">
              Edit Post
            </button>


            {user?.role === "admin" && (

              <button className="danger-btn">
                Delete Post
              </button>

            )}

          </div>

        )}

      </div>

    </section>
  );
}

export default Editor;