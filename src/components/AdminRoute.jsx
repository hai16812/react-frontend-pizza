import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Requires the user to be signed in AND have the "admin" role.
export default function AdminRoute({ children }) {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}
