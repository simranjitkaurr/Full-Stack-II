import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "./auth";

export default function RoleRoute({ allowedRoles }) {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
