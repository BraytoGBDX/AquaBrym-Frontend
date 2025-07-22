import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from '../../assets/iniciar sesion.png'; 
import logo from '../../assets/logo.png';
import googleIcon from '../../assets/google.png';
import './styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (tipo) => {
    const token = { tipo };
    localStorage.setItem("token", JSON.stringify(token));
    if (tipo === "admin") navigate("/admin");
    else navigate("/user");
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-img-side">
          <img src={loginImg} alt="Login" className="login-illustration" />
        </div>
        <div className="login-form-side">
          <div className="login-form-box">
            <div className="login-logo">
              <img src={logo} alt="Logo" style={{ width: 48, height: 48 }} />
            </div>
            <h2>Hello Again!</h2>
            <p className="login-subtitle">
              Tu espacio personal comienza aquí. Inicia sesión para acceder a tus herramientas.
            </p>
            <form onSubmit={e => { e.preventDefault(); handleLogin("user"); }}>
              <input
                className="login-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                className="login-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <label style={{ fontSize: 14 }}>
                  <input type="checkbox" style={{ marginRight: 6 }} /> Remember Me
                </label>
                <a href="#" style={{ fontSize: 14, color: '#2d5bff', textDecoration: 'none' }}>Recovery Password</a>
              </div>
              <button className="login-accept-btn" type="submit">Login</button>
            </form>
            <button className="login-google-btn" type="button" style={{ marginBottom: 16 }}>
              <img src={googleIcon} alt="Google" className="login-google-icon" />
              Sign in with Google
            </button>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
              <button className="login-accept-btn" style={{ width: 'auto', padding: '8px 16px', background: '#888' }} onClick={() => handleLogin("user")}>Entrar como Usuario</button>
              <button className="login-accept-btn" style={{ width: 'auto', padding: '8px 16px', background: '#2d5bff' }} onClick={() => handleLogin("admin")}>Entrar como Admin</button>
            </div>
            <div className="login-login-link" style={{ marginTop: 16 }}>
              Don't have an account yet? <a href="/register">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
