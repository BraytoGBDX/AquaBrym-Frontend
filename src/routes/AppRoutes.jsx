import { Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Login from '../pages/session/Login';
import Home from '../pages/home/Dashboard'; 
import AdminDashboard from '../pages/admin/Dashboard'; 
import UserDashboard from '../pages/user/Dashboard'; 
import Register from '../pages/session/Register';

function AppRoutes() {
  // 🔹 Mantengo tu código pero ahora decodifico
  const tokenStr = localStorage.getItem("token");
  let token = null;

  if (tokenStr) {
    try {
      // En vez de JSON.parse, usamos jwtDecode
      token = jwtDecode(tokenStr);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }

  return (
    <Routes>
      {/* Ruta raíz: redirección según token */}
      <Route
        path="/"
        element={
          token?.tipo === "admin" ? (
            <Navigate to="/admin" />
          ) : token?.tipo === "user" ? (
            <Navigate to="/user" />
          ) : (
            <Home />
          )
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
    </Routes>
  );
}

export default AppRoutes;
