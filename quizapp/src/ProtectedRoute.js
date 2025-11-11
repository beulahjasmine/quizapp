// src/ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [isChecking, setIsChecking] = useState(true);
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    // Check token after component mounts
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setIsChecking(false);
  }, []);
  
  // Show loading while checking
  if (isChecking) {
    return <div>Loading...</div>;
  }
  
  if (!token) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
}