import { useState } from 'react';
import './styles/Register.css';
import logo from '../../assets/logo.png';
import registerImg from '../../assets/registro.png';
import googleIcon from '../../assets/google.png';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const body = {
      email,
      password_hash: password,
      first_name: name,
      last_name: lastName,
      role: 'user',
    };

    try {
      const response = await fetch(`${url}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Error al registrar usuario');

      alert('Registro exitoso');
      navigate('/login');
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Hubo un error al registrar');
    }
  };

  return (
    <div className="register-bg">
      <div className="register-card">
        <div className="register-img-side">
          <img src={registerImg} alt="Registro" className="register-illustration" />
        </div>
        <div className="register-form-side">
          <div className="register-form-box">
            <div className="register-logo">
              <img src={logo} alt="Logo" style={{ width: 48, height: 48 }} />
            </div>
            <h2>Registro</h2>
            <p className="register-subtitle">
              Obtén acceso exclusivo, guarda tu progreso y más. ¡Regístrate gratis!
            </p>
            <form onSubmit={handleRegister}>
              <input className="register-input" type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
              <input className="register-input" type="text" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} />
              <input className="register-input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <input className="register-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <input className="register-input" type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              <button className="register-accept-btn" type="submit">Accept</button>
            </form>
            <button className="register-google-btn" type="button">
              <img src={googleIcon} alt="Google" className="register-google-icon" />
              Sign up with Google
            </button>
            <div className="register-login-link">
              Already have an account? <a href="/login">Sign in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
