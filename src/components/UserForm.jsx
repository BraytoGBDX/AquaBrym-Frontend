import React, { useState } from 'react';
import './styles/UserForm.css';

export default function UserForm({ onSubmit }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'user'
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      role: 'user'
    });
  };

  return (
    <form className="userform-modal" onSubmit={handleSubmit}>
      <h2 className="userform-title">Crear Usuario</h2>
      <label className="userform-label">Email</label>
      <input
        className="userform-input"
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <label className="userform-label">Contraseña</label>
      <input
        className="userform-input"
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
      />
      <label className="userform-label">Nombre</label>
      <input
        className="userform-input"
        type="text"
        name="first_name"
        placeholder="Nombre"
        value={form.first_name}
        onChange={handleChange}
        required
      />
      <label className="userform-label">Apellido</label>
      <input
        className="userform-input"
        type="text"
        name="last_name"
        placeholder="Apellido"
        value={form.last_name}
        onChange={handleChange}
        required
      />
      <label className="userform-label">Rol</label>
      <select
        className="userform-select"
        name="role"
        value={form.role}
        onChange={handleChange}
      >
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <button className="userform-btn" type="submit">
        Crear
      </button>
    </form>
  );
}