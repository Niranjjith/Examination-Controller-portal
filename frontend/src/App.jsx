import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import StudentServices from "./pages/StudentServices";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Exams from "./pages/admin/Exams";
import CenterDashboard from "./pages/center/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import RoleGuard from "./auth/RoleGuard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<StudentServices />} />
        <Route path="/login" element={<Login />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleGuard role="ADMIN">
                <AdminDashboard />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/exams"
          element={
            <ProtectedRoute>
              <RoleGuard role="ADMIN">
                <Exams />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        {/* Center */}
        <Route
          path="/center"
          element={
            <ProtectedRoute>
              <RoleGuard role="CENTER">
                <CenterDashboard />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
