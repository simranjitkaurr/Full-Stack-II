import React from "react";
import { getUser } from "../auth";

function Profile() {
  const user = getUser();

  return (
    <section>

      <div className="page-heading">

        <p className="eyebrow">
          User Information
        </p>

        <h1>
          Profile
        </h1>

        <p>
          Your account information is shown below.
        </p>

      </div>


      <div className="card profile">

        <div>
          <span>Name</span>
          <strong>
            {user?.name || "N/A"}
          </strong>
        </div>


        <div>
          <span>Username</span>
          <strong>
            {user?.username || "N/A"}
          </strong>
        </div>


        <div>
          <span>Role</span>
          <strong>
            {user?.role || "N/A"}
          </strong>
        </div>

      </div>

    </section>
  );
}

export default Profile;