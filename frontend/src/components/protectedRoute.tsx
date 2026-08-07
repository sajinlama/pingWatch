import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  // Show a loading indicator while /api/me verifies the cookie
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if cookie verification returned no user
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}