// src/pages/Home/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const irAlLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Bienvenido al Dashboard Principal</h1>
      <button onClick={irAlLogin} style={{ marginTop: '1rem', padding: '10px 20px' }}>
        Ir al Login
      </button>
    </div>
  );
}
