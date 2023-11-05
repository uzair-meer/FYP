import { Navigate } from "react-router-dom";
export default function UserProtectedRoute({ user, component }) {
  if (user?.role !== "USER") {
    return <Navigate to="/signin" replace />;
  }
  return component;
}

export function AdminProtectedRoute({ user, component }) {
  if (user?.role !== "ADMIN") {
    return <Navigate to="/signin" replace />;
  }
  return component;
}
