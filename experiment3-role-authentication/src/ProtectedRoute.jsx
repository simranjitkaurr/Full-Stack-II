import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken, isTokenExpired } from "./auth";

export default function ProtectedRoute() {
  const location = useLocation();
  const token = getToken();

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
