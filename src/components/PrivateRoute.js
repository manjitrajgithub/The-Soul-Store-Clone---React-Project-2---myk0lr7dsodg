// PrivateRoute.js
import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  console.log(component);
  if (!user) {
    sessionStorage.setItem("targetRoute", location.pathname);
  }

  return user ? component : <Navigate to="/login" replace />;
};

export default PrivateRoute;
