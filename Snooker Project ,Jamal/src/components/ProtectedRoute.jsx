import React from 'react';
import { Navigate } from 'react-router-dom';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children; // Render the protected component if logged in
};

export default ProtectedRoute;
