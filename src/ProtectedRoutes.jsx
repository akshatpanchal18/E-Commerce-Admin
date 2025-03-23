import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem("isAuth");

    if (adminToken === "true") {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }

    setLoading(false); // Set loading to false after checking authentication
  }, [isAuthenticated]); // React to changes in auth state

  if (loading) return <div>Loading...</div>; // Optionally replace with a spinner

  return authenticated ? element : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;
