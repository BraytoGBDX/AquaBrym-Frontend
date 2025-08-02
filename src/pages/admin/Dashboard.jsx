import React, { useState } from "react";
import UserForm from "../../components/UserForm";
import EntityForm from "../../components/EntityForm";
import SensorForm from "../../components/SensorForm"; // Importa el formulario de sensores
import "./styles/Dashboard.css";
import Table from "../../components/Table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import logo from "../../assets/logo.png";

const chartData = [
  { day: "Lun", anterior: 5187, actual: 6123 },
  { day: "Mar", anterior: 4321, actual: 4982 },
  { day: "Mié", anterior: 4900, actual: 5221 },
  { day: "Jue", anterior: 4620, actual: 4931 },
  { day: "Vie", anterior: 5100, actual: 5302 },
  { day: "Sáb", anterior: 4902, actual: 5122 },
  { day: "Dom", anterior: 5031, actual: 5390 },
];

const dataMap = {
  Bills: [
    {
      id: 1,
      period_start: "2025-07-01",
      period_end: "2025-07-31",
      consumption_m3: 123.45,
      amount_due: 456.78,
      status: "pending",
    },
    {
      id: 2,
      period_start: "2025-06-01",
      period_end: "2025-06-30",
      consumption_m3: 98.76,
      amount_due: 389.5,
      status: "paid",
    },
  ],
  Entities: [
    { id: 1, name: "Casa Pérez", address: "Calle 123", entity_type: "house" },
    {
      id: 2,
      name: "Instituto ABC",
      address: "Av. Central 456",
      entity_type: "institution",
    },
  ],
  Sensors: [
    { id: 1, sensor_type: "Flujo", model: "FX-200", status: "active" },
    { id: 2, sensor_type: "Presión", model: "PR-150", status: "inactive" },
  ],
  "Sensor Readings": [
    {
      id: 1,
      timestamp: "2025-07-22 12:00",
      volume_liters: 110.5,
      flow_rate_lpm: 15.2,
    },
    {
      id: 2,
      timestamp: "2025-07-22 13:00",
      volume_liters: 132.3,
      flow_rate_lpm: 18.1,
    },
  ],
  Users: [
    {
      id: 1,
      email: "admin@email.com",
      first_name: "Ana",
      last_name: "Martínez",
      role: "admin",
    },
    {
      id: 2,
      email: "user@email.com",
      first_name: "Carlos",
      last_name: "Gómez",
      role: "user",
    },
  ],
  Alertas: [
    {
      id: 1,
      description: "Consumo inusual detectado",
      timestamp: "2025-07-21 18:20",
    },
    {
      id: 2,
      description: "Sensor inactivo más de 24h",
      timestamp: "2025-07-21 10:45",
    },
  ],
};

const columnsMap = {
  Bills: [
    { header: "ID", accessor: "id" },
    {
      header: "Periodo",
      accessor: (row) => `${row.period_start} a ${row.period_end}`,
    },
    { header: "Consumo (m³)", accessor: "consumption_m3" },
    { header: "Monto ($)", accessor: "amount_due" },
    { header: "Estado", accessor: "status" },
  ],
  Entities: [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "name" },
    { header: "Dirección", accessor: "address" },
    { header: "Tipo", accessor: "entity_type" },
  ],
  Sensors: [
    { header: "ID", accessor: "id" },
    { header: "Tipo", accessor: "sensor_type" },
    { header: "Modelo", accessor: "model" },
    { header: "Estado", accessor: "status" },
    { header: "Entidad", accessor: "entityId" },
    { header: "Creado", accessor: "created_at" },
    { header: "Actualizado", accessor: "updated_at" },
    {
      header: "Acciones",
      accessor: (row, { onEdit, onDelete }) => (
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => onEdit(row)}
            style={{
              background: "none",
              border: "none",
              color: "#2d5bff",
              cursor: "pointer",
            }}
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(row)}
            style={{
              background: "none",
              border: "none",
              color: "#e74c3c",
              cursor: "pointer",
            }}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ],
  "Sensor Readings": [
    { header: "ID", accessor: "id" },
    { header: "Fecha", accessor: "timestamp" },
    { header: "Volumen (L)", accessor: "volume_liters" },
    { header: "Flujo (LPM)", accessor: "flow_rate_lpm" },
  ],
  Users: [
    { header: "ID", accessor: "id" },
    { header: "Email", accessor: "email" },
    {
      header: "Nombre",
      accessor: (row) => `${row.first_name} ${row.last_name}`,
    },
    { header: "Rol", accessor: "role" },
  ],
  Alertas: [
    { header: "ID", accessor: "id" },
    { header: "Descripción", accessor: "description" },
    { header: "Fecha", accessor: "timestamp" },
  ],
};

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState(dataMap.Users);

  const [entities, setEntities] = useState(dataMap.Entities);
  const [showEntityForm, setShowEntityForm] = useState(false);

  const [sensors, setSensors] = useState(dataMap.Sensors);
  const [showSensorForm, setShowSensorForm] = useState(false);
  const [sensorToDelete, setSensorToDelete] = useState(null);

  const [sensorToEdit, setSensorToEdit] = useState(null);

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

  function handleCreateUser(data) {
    setUsers([
      ...users,
      {
        id: users.length + 1,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        role: data.role,
      },
    ]);
    setShowForm(false);
  }

  function handleCreateEntity(data) {
    setEntities([
      ...entities,
      {
        id: entities.length + 1,
        name: data.name,
        address: data.address,
        entity_type: data.entity_type,
      },
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
        status: data.status,
      },
    ]);
    setShowSensorForm(false);
  }

  function handleDeleteSensorConfirmed() {
    setSensors(sensors.filter((s) => s.id !== sensorToDelete.id));
    setSensorToDelete(null);
  }

  function handleSaveSensor(data) {
    if (sensorToEdit) {
      // Editar: actualiza el sensor en el array
      setSensors(sensors.map((s) => (s.id === data.id ? data : s)));
    } else {
      // Crear: agrega un nuevo sensor
      setSensors([
        ...sensors,
        {
          id:
            sensors.length > 0 ? Math.max(...sensors.map((s) => s.id)) + 1 : 1,
          sensor_type: data.sensor_type,
          model: data.model,
          status: data.status,
        },
      ]);
    }
    setShowSensorForm(false);
    setSensorToEdit(null);
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="menu">
          {[
            "Dashboard",
            "Bills",
            "Entities",
            "Sensors",
            "Sensor Readings",
            "Users",
            "Alertas",
            "Configuración",
          ].map((item) => (
            <div
              key={item}
              className={`menu-item ${activeSection === item ? "active" : ""}`}
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
            {activeSection === "Dashboard" ? (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="anterior"
                      fill="#82ca9d"
                      name="Semana anterior"
                    />
                    <Bar dataKey="actual" fill="#2d5bff" name="Semana actual" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="chart-description">
                  Gráfico de barras que muestra el consumo comparado entre
                  semanas.
                </div>
              </>
            ) : activeSection === "Entities" ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <h2>Entidades</h2>
                  <button
                    className="btn btn-blue"
                    style={{
                      padding: "8px 16px",
                      borderRadius: 8,
                      background: "#2d5bff",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowEntityForm(true)}
                  >
                    Crear Entidad
                  </button>
                </div>
                <Table
                  title={activeSection}
                  columns={columnsMap[activeSection]}
                  data={entities}
                />
                {showEntityForm && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      background: "rgba(0,0,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1000,
                    }}
                  >
                    <div
                      style={{
                        background: "#fff",
                        padding: 32,
                        borderRadius: 12,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                        minWidth: 400,
                      }}
                    >
                      <EntityForm onSubmit={handleCreateEntity} />
                      <button
                        style={{
                          marginTop: 16,
                          width: "100%",
                          padding: "8px",
                          borderRadius: 8,
                          background: "#888",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowEntityForm(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : activeSection === "Sensors" ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <h2>Sensores</h2>
                  <button
                    className="btn btn-blue"
                    style={{
                      padding: "8px 16px",
                      borderRadius: 8,
                      background: "#2d5bff",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowSensorForm(true)}
                  >
                    Crear Sensor
                  </button>
                </div>
                <Table
                  title={activeSection}
                  columns={columnsMap[activeSection]}
                  data={sensors}
                  actions={{
                    onEdit: (row) => {
                      setSensorToEdit(row);
                      setShowSensorForm(true);
                    },
                    onDelete: (row) => setSensorToDelete(row),
                  }}
                />
                {showSensorForm && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      background: "rgba(0,0,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1000,
                    }}
                  >
                    <div
                      style={{
                        background: "#fff",
                        padding: 32,
                        borderRadius: 12,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                        minWidth: 400,
                      }}
                    >
                      <SensorForm
                        sensor={sensorToEdit}
                        onClose={() => {
                          setShowSensorForm(false);
                          setSensorToEdit(null);
                        }}
                        onSubmit={handleSaveSensor}
                      />
                      <button
                        style={{
                          marginTop: 16,
                          width: "100%",
                          padding: "8px",
                          borderRadius: 8,
                          background: "#888",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setShowSensorForm(false);
                          setSensorToEdit(null);
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : activeSection === "Users" ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <h2>Usuarios</h2>
                  <button
                    className="btn btn-blue"
                    style={{
                      padding: "8px 16px",
                      borderRadius: 8,
                      background: "#2d5bff",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowForm(true)}
                  >
                    Crear Usuario
                  </button>
                </div>
                <Table
                  title={activeSection}
                  columns={columnsMap[activeSection]}
                  data={users}
                />
                {showForm && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      background: "rgba(0,0,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1000,
                    }}
                  >
                    <div
                      style={{
                        background: "#fff",
                        padding: 32,
                        borderRadius: 12,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                        minWidth: 400,
                      }}
                    >
                      <UserForm onSubmit={handleCreateUser} />
                      <button
                        style={{
                          marginTop: 16,
                          width: "100%",
                          padding: "8px",
                          borderRadius: 8,
                          background: "#888",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowForm(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : activeSection === "Configuración" ? (
              <>
                <div style={{ padding: "20px", width: "100%" }}>
                  {!showAccountOptions ? (
                    <>
                      <h2 style={{ marginBottom: "20px" }}>Configuración</h2>
                      <ul
                        style={{
                          listStyle: "none",
                          paddingLeft: 0,
                          fontSize: "16px",
                          lineHeight: "2",
                        }}
                      >
                        <li
                          style={{ cursor: "pointer", color: "#2d5bff" }}
                          onClick={() => setShowAccountOptions(true)}
                        >
                          Opciones de cuenta
                        </li>
                        <li>Activar/Desactivar Notificaciones</li>
                        <li>
                          Cambiar Tema
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oscuro/Claro
                        </li>
                        <li>Ajustes de sonido y vibración</li>
                        <li>Actualizaciones y mantenimiento</li>
                        <li>Ayuda y soporte</li>
                        <li
                          style={{ cursor: "pointer", color: "#e74c3c" }}
                          onClick={() => setShowLogoutConfirm(true)}
                        >
                          Cerrar sesión
                        </li>
                      </ul>

                      {/* 🔔 Alerta de confirmación para cerrar sesión */}
                      {showLogoutConfirm && (
                        <div
                          style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1000,
                          }}
                        >
                          <div
                            style={{
                              background: "#fff",
                              padding: "30px 40px",
                              borderRadius: "12px",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                              textAlign: "center",
                              maxWidth: 400,
                            }}
                          >
                            <h3 style={{ marginBottom: 20 }}>
                              ¿Seguro que deseas cerrar sesión?
                            </h3>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 40,
                              }}
                            >
                              <button
                                style={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: "50%",
                                  background: "#2ecc40",
                                  border: "none",
                                  fontSize: 32,
                                  color: "#fff",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setShowLogoutConfirm(false);
                                  alert("Sesión cerrada");
                                }}
                              >
                                ✔
                              </button>
                              <button
                                style={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: "50%",
                                  background: "#e74c3c",
                                  border: "none",
                                  fontSize: 32,
                                  color: "#fff",
                                  cursor: "pointer",
                                }}
                                onClick={() => setShowLogoutConfirm(false)}
                              >
                                ✖
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "20px",
                        padding: "20px",
                        background: "#f5f5f5",
                        borderRadius: "12px",
                      }}
                    >
                      {/* Sensores */}
                      <div
                        style={{
                          background: "#fff",
                          padding: "20px",
                          borderRadius: "12px",
                        }}
                      >
                        <h3 style={{ marginBottom: "10px" }}>Sensores</h3>
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

                      {/* Administrador */}
                      <div
                        style={{
                          background: "#fff",
                          padding: "20px",
                          borderRadius: "12px",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ fontSize: 50, marginBottom: 8 }}>👤</div>
                        <div style={{ fontWeight: "bold" }}>Administrador</div>
                        <div style={{ marginBottom: 10 }}>
                          Rol
                          <br />
                          Administrador
                        </div>
                        <button
                          style={{
                            backgroundColor: "#2d5bff",
                            color: "#fff",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            cursor: "pointer",
                          }}
                        >
                          Cambiar contraseña
                        </button>
                      </div>

                      {/* Información de contacto */}
                      <div
                        style={{
                          background: "#fff",
                          padding: "20px",
                          borderRadius: "12px",
                        }}
                      >
                        <h3>Información de contacto</h3>
                        <p>📧 aquaWhatch@gmail.com</p>
                        <p>📄 Documentación</p>
                        <p>🎧 Soporte</p>
                      </div>

                      {/* Información del proyecto */}
                      <div
                        style={{
                          background: "#fff",
                          padding: "20px",
                          borderRadius: "12px",
                        }}
                      >
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

                      {/* Botón de volver */}
                      <div
                        style={{ gridColumn: "span 2", textAlign: "center" }}
                      >
                        <button
                          style={{
                            marginTop: "20px",
                            backgroundColor: "#ccc",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                          }}
                          onClick={() => setShowAccountOptions(false)}
                        >
                          Volver
                        </button>
                      </div>
                    </div>
                  )}
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
              <div className="card-text">
                Sugerencias generadas a partir del consumo.
              </div>
              <div className="btn btn-yellow">Ver Alertas</div>
            </div>
          </div>
        </div>
      </div>

      {sensorToDelete && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              background: "#fff6f7",
              border: "2px solid #2196f3",
              borderRadius: 18,
              padding: 40,
              minWidth: 350,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontSize: 36, marginBottom: 24 }}>ELIMINAR</h2>
            <div style={{ display: "flex", gap: 40, marginBottom: 12 }}>
              <button
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "#2ecc40",
                  border: "none",
                  fontSize: 32,
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={handleDeleteSensorConfirmed}
              >
                ✔
              </button>
              <button
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "#e74c3c",
                  border: "none",
                  fontSize: 32,
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => setSensorToDelete(null)}
              >
                ✖
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
