import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleGuard({ role, children }) {
  const { user } = useAuth();
  return user?.role === role ? children : <Navigate to="/login" />;
}
