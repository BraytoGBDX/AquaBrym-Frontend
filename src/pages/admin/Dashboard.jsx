import React, { useState } from 'react';
import './styles/Dashboard.css';
import Table from '../../components/Table';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

import logo from '../../assets/logo.png';

const chartData = [
  { day: 'Lun', anterior: 5187, actual: 6123 },
  { day: 'Mar', anterior: 4321, actual: 4982 },
  { day: 'Mié', anterior: 4900, actual: 5221 },
  { day: 'Jue', anterior: 4620, actual: 4931 },
  { day: 'Vie', anterior: 5100, actual: 5302 },
  { day: 'Sáb', anterior: 4902, actual: 5122 },
  { day: 'Dom', anterior: 5031, actual: 5390 },
];

const dataMap = {
  Bills: [
    { id: 1, period_start: '2025-07-01', period_end: '2025-07-31', consumption_m3: 123.45, amount_due: 456.78, status: 'pending' },
    { id: 2, period_start: '2025-06-01', period_end: '2025-06-30', consumption_m3: 98.76, amount_due: 389.50, status: 'paid' }
  ],
  Entities: [
    { id: 1, name: 'Casa Pérez', address: 'Calle 123', entity_type: 'house' },
    { id: 2, name: 'Instituto ABC', address: 'Av. Central 456', entity_type: 'institution' }
  ],
  Sensors: [
    { id: 1, sensor_type: 'Flujo', model: 'FX-200', status: 'active' },
    { id: 2, sensor_type: 'Presión', model: 'PR-150', status: 'inactive' }
  ],
  'Sensor Readings': [
    { id: 1, timestamp: '2025-07-22 12:00', volume_liters: 110.5, flow_rate_lpm: 15.2 },
    { id: 2, timestamp: '2025-07-22 13:00', volume_liters: 132.3, flow_rate_lpm: 18.1 }
  ],
  Users: [
    { id: 1, email: 'admin@email.com', first_name: 'Ana', last_name: 'Martínez', role: 'admin' },
    { id: 2, email: 'user@email.com', first_name: 'Carlos', last_name: 'Gómez', role: 'user' }
  ],
  Alertas: [
    { id: 1, description: 'Consumo inusual detectado', timestamp: '2025-07-21 18:20' },
    { id: 2, description: 'Sensor inactivo más de 24h', timestamp: '2025-07-21 10:45' }
  ]
};

const columnsMap = {
  Bills: [
    { header: 'ID', accessor: 'id' },
    { header: 'Periodo', accessor: row => `${row.period_start} a ${row.period_end}` },
    { header: 'Consumo (m³)', accessor: 'consumption_m3' },
    { header: 'Monto ($)', accessor: 'amount_due' },
    { header: 'Estado', accessor: 'status' }
  ],
  Entities: [
    { header: 'ID', accessor: 'id' },
    { header: 'Nombre', accessor: 'name' },
    { header: 'Dirección', accessor: 'address' },
    { header: 'Tipo', accessor: 'entity_type' }
  ],
  Sensors: [
    { header: 'ID', accessor: 'id' },
    { header: 'Tipo', accessor: 'sensor_type' },
    { header: 'Modelo', accessor: 'model' },
    { header: 'Estado', accessor: 'status' }
  ],
  'Sensor Readings': [
    { header: 'ID', accessor: 'id' },
    { header: 'Fecha', accessor: 'timestamp' },
    { header: 'Volumen (L)', accessor: 'volume_liters' },
    { header: 'Flujo (LPM)', accessor: 'flow_rate_lpm' }
  ],
  Users: [
    { header: 'ID', accessor: 'id' },
    { header: 'Email', accessor: 'email' },
    { header: 'Nombre', accessor: row => `${row.first_name} ${row.last_name}` },
    { header: 'Rol', accessor: 'role' }
  ],
  Alertas: [
    { header: 'ID', accessor: 'id' },
    { header: 'Descripción', accessor: 'description' },
    { header: 'Fecha', accessor: 'timestamp' }
  ]
};

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('Dashboard');

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="menu">
          {['Dashboard', 'Bills', 'Entities', 'Sensors', 'Sensor Readings', 'Users', 'Alertas'].map((item) => (
            <div
              key={item}
              className={`menu-item ${activeSection === item ? 'active' : ''}`}
              onClick={() => setActiveSection(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="main-content">
        <div className="topbar">
          <div className="top-links">
            <div className="top-link">Inicio</div>
            <div className="top-link">Solutions</div>
            <div className="top-link">Community</div>
            <div className="top-link">Configuración</div>
            <div className="top-link">Profile</div>
            <div className="logout-btn">Salir</div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Buscar" />
          </div>
        </div>

        <div className="content-grid">
          <div className="main-chart">
            {activeSection === 'Dashboard' ? (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="anterior" fill="#82ca9d" name="Semana anterior" />
                    <Bar dataKey="actual" fill="#2d5bff" name="Semana actual" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="chart-description">
                  Gráfico de barras que muestra el consumo comparado entre semanas.
                </div>
              </>
            ) : (
              <Table
                title={activeSection}
                columns={columnsMap[activeSection]}
                data={dataMap[activeSection]}
              />
            )}
          </div>

          <div className="side-cards">
            <div className="card">
              <div className="card-title">Total de Sensores activos</div>
              <div className="card-text">Indicador en tiempo real.</div>
              <div className="btn btn-blue">Ver Lista</div>
            </div>
            <div className="card yellow">
              <div className="card-title">Alertas recientes</div>
              <div className="card-text">Sugerencias generadas a partir del consumo.</div>
              <div className="btn btn-yellow">Ver Alertas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
