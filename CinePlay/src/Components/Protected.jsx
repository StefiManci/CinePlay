import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";  

const Protected = ({ element }) => {
  const { isAuthenticated, isLoading,user } = useAuth0();
  const roles = user?.["https://yourapp.com/roles"] || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!roles.includes("admin")) {
    return <Navigate to="/Home" replace />;
  }

  return element;
};

export default Protected;