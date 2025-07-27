import React, { useState } from 'react';
import './styles/SensorForm.css';

export default function SensorForm({ onSubmit }) {
  const [form, setForm] = useState({
    sensor_type: '',
    model: '',
    status: 'active'
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      sensor_type: '',
      model: '',
      status: 'active'
    });
  };

  return (
    <form className="sensorform-modal" onSubmit={handleSubmit}>
      <h2 className="sensorform-title">Crear Sensor</h2>
      <label className="sensorform-label">Tipo</label>
      <input
        className="sensorform-input"
        type="text"
        name="sensor_type"
        placeholder="Tipo"
        value={form.sensor_type}
        onChange={handleChange}
        required
      />
      <label className="sensorform-label">Modelo</label>
      <input
        className="sensorform-input"
        type="text"
        name="model"
        placeholder="Modelo"
        value={form.model}
        onChange={handleChange}
        required
      />
      <label className="sensorform-label">Estado</label>
      <select
        className="sensorform-select"
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
      </select>
      <button className="sensorform-btn" type="submit">
        Crear
      </button>
    </form>
  );
}