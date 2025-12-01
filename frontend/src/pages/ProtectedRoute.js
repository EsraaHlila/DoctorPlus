// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken"); // check if user is logged in

  if (!token) {
    return <Navigate to="/error_signin" replace />; // redirect if not logged in
  }

  return children; // show page if logged in
};

export default ProtectedRoute;
