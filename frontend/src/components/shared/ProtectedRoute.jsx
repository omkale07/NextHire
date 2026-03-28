import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Protects pages that require login
export function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  return children;
}

// Protects pages only for recruiters (admin)
export function RecruiterRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/landing" replace />;
  if (user.role !== "recruiter") return <Navigate to="/" replace />;

  return children;
}

// Prevents logged-in users from going back to /login or /signup
export function PublicOnlyRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}