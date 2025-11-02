// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRoles }) {
  const tokenStr = localStorage.getItem("token");

  if (!tokenStr) {
    // No hay token → enviar a login
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(tokenStr);

    // Si el token expiró (exp está en segundos)
    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

    // Si el rol no está permitido
    if (!allowedRoles.includes(decoded.role)) {
      // Redirige al dashboard correcto según su rol
      if (decoded.role === "admin") return <Navigate to="/admin" replace />;
      if (decoded.role === "user") return <Navigate to="/user" replace />;
      return <Navigate to="/login" replace />;
    }

    // ✅ Autorizado
    return children;
  } catch (err) {
    console.error("Token inválido:", err);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;
