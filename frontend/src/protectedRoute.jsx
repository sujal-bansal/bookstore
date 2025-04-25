import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { authUser, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  const location = useLocation();

  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && authUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
