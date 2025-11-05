import React, { useState } from 'react';
import UserForm from '../../components/UserForm';
import EntityForm from '../../components/EntityForm';
import SensorForm from '../../components/SensorForm';
import './styles/DashboardUser.css';
import Table from '../../components/Table';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import Configuration from '../../components/Configuration';
import Profile from '../../components/Profile';

const chartData = [
  { day: 'Lun', anterior: 5187, actual: 6123 },
  { day: 'Mar', anterior: 4321, actual: 4982 },
  { day: 'Mié', anterior: 4900, actual: 5221 },
  { day: 'Jue', anterior: 4620, actual: 4931 },
  { day: 'Vie', anterior: 5100, actual: 5302 },
  { day: 'Sáb', anterior: 4902, actual: 5122 },
  { day: 'Dom', anterior: 5031, actual: 5390 },
];

const columnsMap = {
Bills: [
  { header: 'ID', accessor: 'id' },
  { header: 'Periodo', accessor: row => `${row.period_start} a ${row.period_end}` },
  { header: 'Consumo (m³)', accessor: 'consumption_m3' },
  { header: 'Tarifa por m³', accessor: 'rate_per_m3' },
  { header: 'Cargo fijo', accessor: 'fixed_charge' },
  { header: 'Monto ($)', accessor: 'amount_due' },
  { header: 'Emitido', accessor: 'issued_at' },
  { header: 'Vence', accessor: 'due_date' },
  { header: 'Estado', accessor: 'status' },
  { header: 'Entidad ID', accessor: 'entityId' },
  { header: 'Creado', accessor: 'created_at' },
  { header: 'Actualizado', accessor: 'updated_at' }
],
Entities: [
  { header: 'ID', accessor: 'id' },
  { header: 'Nombre', accessor: 'name' },
  { header: 'Dirección', accessor: 'address' },
  { header: 'Tipo', accessor: 'entity_type' },
  { header: 'Usuario', accessor: 'userId' },
  { header: 'Creado', accessor: 'created_at' },
  { header: 'Actualizado', accessor: 'updated_at' }
],
Sensors: [
  { header: 'ID', accessor: 'id' },
  { header: 'Tipo', accessor: 'sensor_type' },
  { header: 'Modelo', accessor: 'model' },
  { header: 'Instalación', accessor: 'installation_at' },
  { header: 'Estado', accessor: 'status' },
  { header: 'Entidad', accessor: 'entityId' },
  { header: 'Creado', accessor: 'created_at' },
  { header: 'Actualizado', accessor: 'updated_at' }
],
'Sensor Readings': [
  { header: 'ID', accessor: 'id' },
  { header: 'Fecha', accessor: 'timestamp' },
  { header: 'Pulsos', accessor: 'pulses' },
  { header: 'Flujo (LPM)', accessor: 'flow_rate_lpm' },
  { header: 'Volumen (L)', accessor: 'volume_liters' },
  { header: 'Sensor ID', accessor: 'sensorId' },
  { header: 'Creado', accessor: 'created_at' }
],
  Alertas: [
    { header: 'ID', accessor: 'id' },
    { header: 'Descripción', accessor: 'description' },
    { header: 'Fecha', accessor: 'timestamp' }
  ]
};

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [showForm, setShowForm] = useState(false);
  const [entities, setEntities] = useState(dataMap.Entities);
  const [showEntityForm, setShowEntityForm] = useState(false);
  const [sensors, setSensors] = useState(dataMap.Sensors);
  const [showSensorForm, setShowSensorForm] = useState(false);

  const navigate = useNavigate(); // para redireccionar a Home

  const [showAccountOptions, setShowAccountOptions] = useState(false);
    const [sensorSettings, setSensorSettings] = useState({
      activar: true,
      exceso: true,
      inactividad: true,
    });
  
    const toggleSensorSetting = (key) => {
      setSensorSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  function handleCreateEntity(data) {
    setEntities([
      ...entities,
      {
        id: entities.length + 1,
        name: data.name,
        address: data.address,
        entity_type: data.entity_type
      }
    ]);
    setShowEntityForm(false);
  }

  function handleCreateSensor(data) {
    setSensors([
      ...sensors,
      {
        id: sensors.length + 1,
        sensor_type: data.sensor_type,
        model: data.model,
        status: data.status
      }
    ]);
    setShowSensorForm(false);
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="menu">
          {['Dashboard', 'Bills', 'Entities', 'Sensors', 'Sensor Readings', 'Alertas', 'Configuración'].map((item) => (
            <div
              key={item}
              className={`menu-item ${activeSection === item ? 'active' : ''}`}
              onClick={() => {
                if (item === 'Dashboard') {
                  navigate('/');
                } else {
                  setActiveSection(item);
                }
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {showLogoutConfirm && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-box">
            <h3>¿Seguro que deseas cerrar sesión?</h3>
            <div className="logout-confirm-actions">
              <button
                className="logout-btn-yes"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  navigate("/dashboard");
                }}
              >
                ✔
              </button>
              <button
                className="logout-btn-no"
                onClick={() => setShowLogoutConfirm(false)}
              >
                ✖
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="main-content">
        <div className="topbar">
          <div className="top-links">
            <div className="top-link" >Configuración</div>
            <div
              className="top-link"
              onClick={() => setActiveSection("Profile")}
            >
              Perfil
            </div>
            <div
        className="logout-btn"
        onClick={() => setShowLogoutConfirm(true)}
        style={{ cursor: "pointer" }}
      >
        Salir
      </div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Buscar" />
          </div>
        </div>

        <div className="content-grid">
          <div className="main-chart">
            {activeSection === 'Entities' ? (
              <>
                <div className="header-actions-row">
                  <h2>Entidades</h2>
                  <button className="btn btn-blue" onClick={() => setShowEntityForm(true)}>
                    Crear Entidad
                  </button>
                </div>
                <Table title={activeSection} columns={columnsMap[activeSection]} data={entities} />
                {showEntityForm && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <EntityForm onSubmit={handleCreateEntity} />
                      <button className="btn btn-cancel" onClick={() => setShowEntityForm(false)}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : activeSection === 'Sensors' ? (
              <>
                <div className="header-actions-row">
                  <h2>Sensores</h2>
                  <button className="btn btn-blue" onClick={() => setShowSensorForm(true)}>
                    Crear Sensor
                  </button>
                </div>
                <Table title={activeSection} columns={columnsMap[activeSection]} data={sensors} />
                {showSensorForm && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <SensorForm onSubmit={handleCreateSensor} />
                      <button className="btn btn-cancel" onClick={() => setShowSensorForm(false)}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : activeSection === 'Dashboard' ? (
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
            ) : activeSection === "Configuración" ? (
              <Configuration/>
            ) : activeSection === "Profile" ? (
              <Profile/>
            ): (
              <Table title={activeSection} columns={columnsMap[activeSection]} data={dataMap[activeSection]} />
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
