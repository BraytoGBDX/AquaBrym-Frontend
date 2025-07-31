import React, { useState, useEffect } from 'react';
import './styles/SensorForm.css';

const SensorForm = ({ sensor, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    sensor_type: '',
    model: '',
    status: 'active'
  });

  // Cuando cambia el sensor, actualiza los campos
  useEffect(() => {
    if (sensor) {
      setFormData({
        sensor_type: sensor.sensor_type || '',
        model: sensor.model || '',
        status: sensor.status || 'active'
      });
    } else {
      setFormData({
        sensor_type: '',
        model: '',
        status: 'active'
      });
    }
  }, [sensor]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sensor) {
      // Es edición, incluye el id
      onSubmit({ ...formData, id: sensor.id });
    } else {
      // Es creación
      onSubmit(formData);
    }
    onClose();
  };

  return (
    <form className="sensorform-modal" onSubmit={handleSubmit}>
      <h2 className="sensorform-title">{sensor ? 'Editar Sensor' : 'Crear Sensor'}</h2>
      <label className="sensorform-label">Tipo</label>
      <input
        className="sensorform-input"
        type="text"
        name="sensor_type"
        placeholder="Tipo"
        value={formData.sensor_type}
        onChange={handleChange}
        required
      />
      <label className="sensorform-label">Modelo</label>
      <input
        className="sensorform-input"
        type="text"
        name="model"
        placeholder="Modelo"
        value={formData.model}
        onChange={handleChange}
        required
      />
      <label className="sensorform-label">Estado</label>
      <select
        className="sensorform-select"
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
      </select>
      <button className="sensorform-btn" type="submit">
        {sensor ? 'Editar' : 'Crear'}
      </button>
    </form>
  );
}

export default SensorForm;

