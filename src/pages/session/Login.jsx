import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (tipo) => {
    const token = {
      tipo: tipo, // "admin" o "user"
    };
    localStorage.setItem("token", JSON.stringify(token));

    if (tipo === "admin") navigate("/admin");
    else navigate("/user");
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => handleLogin("user")}>Entrar como Usuario</button>
      <button onClick={() => handleLogin("admin")}>Entrar como Admin</button>
    </div>
  );
}

export default Login;
