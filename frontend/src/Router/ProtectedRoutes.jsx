import { Navigate } from "react-router-dom";
export default function UserProtectedRoute({ user, component }) {
  if (user?.role !== "client") {
    return <Navigate to="/signin" replace />;
  }
  return component;
}

export function AdminProtectedRoute({ user, component }) {
  if (user?.role !== "admin") {
    return <Navigate to="/signin" replace />;
  }
  return component;
}
export function CompanyProtectedRoute({ user, component }) {
  if (user?.role !== "company") {
    return <Navigate to="/signin" replace />;
  }
  return component;
}
export function DriverProtectedRoute({ user, component }) {
  if (user?.role !== "employee") {
    return <Navigate to="/signin" replace />;
  }
  return component;
}
