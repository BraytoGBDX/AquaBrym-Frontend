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
              <div className="config-section">
                {!showAccountOptions ? (
                  <>
                    <h2>Configuración</h2>
                    <ul className="config-list">
                      <li
                        className="config-option"
                        onClick={() => setShowAccountOptions(true)}
                      >
                        Opciones de cuenta
                      </li>
                      <li
                        className="config-option"
                        onClick={() => setActiveSection("Profile")}
                      >
                        Activar/Desactivar Notificaciones
                      </li>
                      <li
                        className="config-option"
                        onClick={() => setActiveSection("Profile")}
                      >
                        Cambiar Tema &nbsp;&nbsp;&nbsp;Oscuro/Claro
                      </li>
                      <li
                        className="config-option"
                        onClick={() => setActiveSection("Profile")}
                      >
                        Ajustes de sonido y vibración
                      </li>
                      <li
                        className="config-option"
                        onClick={() => setShowAccountOptions(true)}
                      >
                        Actualizaciones y mantenimiento
                      </li>
                      <li
                        className="config-option"
                        onClick={() => setShowAccountOptions(true)}
                      >
                        Ayuda y soporte
                      </li>
                      <li
                        className="config-option"
                        onClick={() => setShowLogoutConfirm(true)}
                      >
                        Cerrar sesión
                      </li>
                    </ul>
                  </>
                ) : (
                  <div className="account-options-grid">
                    <div className="option-card">
                      <h3>Sensores</h3>
                      {["activar", "exceso", "inactividad"].map((key) => {
                        const labels = {
                          activar: "Activar sensores",
                          exceso: "Exceso de consumo",
                          inactividad: "Inactividad",
                        };
                        return (
                          <div
                            key={key}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "10px",
                            }}
                          >
                            <span>{labels[key]}</span>
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={sensorSettings[key]}
                                onChange={() => toggleSensorSetting(key)}
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        );
                      })}
                    </div>

                    <div className="option-card centered">
                      <div className="emoji">👤</div>
                      <div style={{ fontWeight: "bold" }}>Usuario</div>
                      <button>Cambiar contraseña</button>
                    </div>

                    <div className="option-card">
                      <h3>Información de contacto</h3>
                      <p>📧 aquaWatch@gmail.com</p>
                      <p>📄 Documentación</p>
                      <p>🎧 Soporte</p>
                    </div>

                    <div className="option-card">
                      <h3>Información del proyecto</h3>
                      <p>
                        <strong>AquaWhatch</strong>
                      </p>
                      <p>
                        Sistema de consumo consciente de agua y alertas en
                        tiempo real.
                      </p>
                      <p>
                        <strong>Versión:</strong> 1.2
                      </p>
                      <p>
                        <strong>Sitio Web:</strong> 1
                      </p>
                      <p>
                        <strong>Actualización:</strong> 3
                      </p>
                    </div>

                    <div className="return-btn-container">
                      <button onClick={() => setShowAccountOptions(false)}>
                        Volver
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : activeSection === "Profile" ? (
              <div className="profile-modal">
                <div className="profile-modal-content">
                  <button
                    onClick={() => setActiveSection("Dashboard")}
                    className="close-btn"
                  >
                    Volver
                  </button>

                  <div className="profile-col">
                    <div className="avatar">👤</div>
                    <h3>Valentina</h3>
                    <small>
                    </small>
                    <p>👤 Cambiar nombre </p>
                    <p>📧 user@gmail.com</p>
                    <p>📞 +7461144910</p>
                  </div>

                  <div className="profile-col">
                    <div className="settings-icon">⚙️</div>
                    <h3>Preferencias</h3>

                    <div>
                      <label>Idioma</label>
                      <br />
                      <select>
                        <option>Español</option>
                        <option>Inglés</option>
                      </select>
                    </div>

                    <div>
                      <label>Tema</label>
                      <br />
                      <label>
                        <input type="radio" name="tema" /> Claro
                      </label>
                      <label style={{ marginLeft: 20 }}>
                        <input type="radio" name="tema" /> Oscuro
                      </label>
                    </div>

                    <div>
                      <label>Notificaciones</label>
                      <br />
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                      </label>
                    </div>

                    <div>
                      <label>Sonido de alerta</label>
                      <br />
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
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
