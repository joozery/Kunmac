import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const isAuth = !!localStorage.getItem("admin-auth");
  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
} 