import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Login from "../pages/session/Login";
import Home from "../pages/home/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import UserDashboard from "../pages/user/Dashboard";
import Register from "../pages/session/Register";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  const tokenStr = localStorage.getItem("token");
  let token = null;

  if (tokenStr) {
    try {
      token = jwtDecode(tokenStr);
    } catch (error) {
      console.error("Error al decodificar token:", error);
    }
  }

  return (
    <Routes>
      {/* Ruta raíz: redirige según token */}
      <Route
        path="/"
        element={
          token?.role === "admin" ? (
            <Navigate to="/admin" />
          ) : token?.role === "user" ? (
            <Navigate to="/user" />
          ) : (
            <Home />
          )
        }
      />

      {/* Públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Home />} />

      {/* Protegidas */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
