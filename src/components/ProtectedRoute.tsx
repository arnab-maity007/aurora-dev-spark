
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-sports-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Redirect to auth page if user is not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Render children if user is authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
