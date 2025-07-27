import React, { useState } from 'react';
import './styles/EntityForm.css';

export default function EntityForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    address: '',
    entity_type: 'house'
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      address: '',
      entity_type: 'house'
    });
  };

  return (
    <form className="entityform-modal" onSubmit={handleSubmit}>
      <h2 className="entityform-title">Crear Entidad</h2>
      <label className="entityform-label">Nombre</label>
      <input
        className="entityform-input"
        type="text"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        required
      />
      <label className="entityform-label">Dirección</label>
      <input
        className="entityform-input"
        type="text"
        name="address"
        placeholder="Dirección"
        value={form.address}
        onChange={handleChange}
        required
      />
      <label className="entityform-label">Tipo</label>
      <select
        className="entityform-select"
        name="entity_type"
        value={form.entity_type}
        onChange={handleChange}
      >
        <option value="house">Casa</option>
        <option value="institution">Institución</option>
      </select>
      <button className="entityform-btn" type="submit">
        Crear
      </button>
    </form>
  );
}