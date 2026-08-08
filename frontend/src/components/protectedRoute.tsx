import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  // Show a loading indicator while /api/me verifies the cookie
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if cookie verification returned no user
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}