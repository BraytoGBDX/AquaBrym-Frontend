import { useState, useEffect } from "react";
import Configuration from "../../components/Configuration";
import Profile from "../../components/Profile";
import UserForm from "../../components/UserForm";
import EntityForm from "../../components/EntityForm";
import SensorForm from "../../components/SensorForm";
import "./styles/Dashboard.css";
import Table from "../../components/Table";
import { useNavigate } from 'react-router-dom';
import {BarChart, Bar, XAxis,YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,} from "recharts";
import logo from "../../assets/logo.png";
import { columnsMap } from "./ColumnsTable";

const chartData = [
  { day: "Lun", anterior: 5187, actual: 6123 },
  { day: "Mar", anterior: 4321, actual: 4982 },
  { day: "Mié", anterior: 4900, actual: 5221 },
  { day: "Jue", anterior: 4620, actual: 4931 },
  { day: "Vie", anterior: 5100, actual: 5302 },
  { day: "Sáb", anterior: 4902, actual: 5122 },
  { day: "Dom", anterior: 5031, actual: 5390 },
];


function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [entities, setEntities] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [readings, setReadings] = useState([]);
  const [bills, setBills] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const [showEntityForm, setShowEntityForm] = useState(false);
  const [showSensorForm, setShowSensorForm] = useState(false);
  const [sensorToDelete, setSensorToDelete] = useState(null);
  const [sensorToEdit, setSensorToEdit] = useState(null);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json()).then(setUsers).catch(console.error);

    fetch(`${API_URL}/entities`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json()).then(setEntities).catch(console.error);

    fetch(`${API_URL}/sensors`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json()).then(setSensors).catch(console.error);

    fetch(`${API_URL}/sensor-readings`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json()).then(setReadings).catch(console.error);

    fetch(`${API_URL}/bills`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json()).then(setBills).catch(console.error);

    fetch(`${API_URL}/alerts`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json()).then(setAlerts).catch(console.error);
  }, []);

  const dataMap = {
    Bills: bills,
    Entities: entities,
    Sensors: sensors,
    "Sensor Readings": readings,
    Users: users,
    Alertas: alerts,
  };

  const currentData = dataMap[activeSection] || [];
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const paginatedData = currentData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

const handleNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const handlePrevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

  useEffect(() => {
    setCurrentPage(1);
  }, [activeSection]);

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
      {showLogoutConfirm && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-box">
            <h3>¿Seguro que deseas cerrar sesión?</h3>
            <div className="logout-confirm-actions">
              <button
                className="logout-btn-yes"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  alert("Sesión cerrada");
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
            <div className="top-link">Configuración</div>
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
            ) : activeSection === "Bills" ? (
              <>
                <div className="header-actions-row">
                  <h2>Entidades</h2>
                  <button
                    className="btn btn-blue"
                    onClick={() => setShowEntityForm(true)}
                  >
                    Crear Entidad
                  </button>
                </div>
                <Table
                  title={activeSection}
                  columns={columnsMap[activeSection]}
                  data={paginatedData}
                />
                <div className="pagination">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >Anterior
                  </button>
                  <span>Página {currentPage} de {totalPages}</span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >Siguiente
                    </button>
                  </div>
                {showEntityForm && (
                  <div className="modal-eliminar-overlay">
                    <div className="modal-eliminar-content">
                      <EntityForm onSubmit={handleCreateEntity} />
                      <button
                        className="btn"
                        onClick={() => setShowEntityForm(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : activeSection === "Entities" ? (
              <>
                <div className="header-actions-row">
                  <h2>Entidades</h2>
                  <button
                    className="btn btn-blue"
                    onClick={() => setShowEntityForm(true)}
                  >
                    Crear Entidad
                  </button>
                </div>
                <Table
                  title={activeSection}
                  columns={columnsMap[activeSection]}
                  data={paginatedData}
                />
                <div className="pagination">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >Anterior
                  </button>
                  <span>Página {currentPage} de {totalPages}</span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >Siguiente
                    </button>
                  </div>
                {showEntityForm && (
                  <div className="modal-eliminar-overlay">
                    <div className="modal-eliminar-content">
                      <EntityForm onSubmit={handleCreateEntity} />
                      <button
                        className="btn"
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
                <div className="header-actions-row">
                  <h2>Sensores</h2>
                  <button
                    className="btn btn-blue"
                    onClick={() => setShowSensorForm(true)}
                  >
                    Crear Sensor
                  </button>
                </div>
                <Table
                  title={activeSection}
                  columns={columnsMap[activeSection]}
                  data={paginatedData}
                  actions={{
                    onEdit: (row) => {
                      setSensorToEdit(row);
                      setShowSensorForm(true);
                    },
                    onDelete: (row) => setSensorToDelete(row),
                  }}
                />
                <div className="pagination">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >Anterior
                  </button>
                  <span>Página {currentPage} de {totalPages}</span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >Siguiente
                    </button>
                  </div>
                {showSensorForm && (
                  <div className="modal-eliminar-overlay">
                    <div className="modal-eliminar-content">
                      <SensorForm
                        sensor={sensorToEdit}
                        onClose={() => {
                          setShowSensorForm(false);
                          setSensorToEdit(null);
                        }}
                        onSubmit={handleSaveSensor}
                      />
                      <button
                        className="btn"
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
            ): activeSection === "Sensor Readings" ? (
              <>
                <div className="header-actions-row">
                  <h2>Entidades</h2>
                  <button
                    className="btn btn-blue"
                    onClick={() => setShowEntityForm(true)}
                  >
                    Crear Entidad
                  </button>
                </div>
                <Table
                  title={activeSection}
                  columns={columnsMap[activeSection]}
                  data={paginatedData}
                />
                <div className="pagination">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >Anterior
                  </button>
                  <span>Página {currentPage} de {totalPages}</span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >Siguiente
                    </button>
                  </div>
                {showEntityForm && (
                  <div className="modal-eliminar-overlay">
                    <div className="modal-eliminar-content">
                      <EntityForm onSubmit={handleCreateEntity} />
                      <button
                        className="btn"
                        onClick={() => setShowEntityForm(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </>
              ) : activeSection === "Users" ? (
              <>
                <div className="header-actions-row">
                  <h2>Usuarios</h2>
                  <button
                    className="btn btn-blue"
                    onClick={() => setShowForm(true)}
                  >
                    Crear Usuario
                  </button>
                </div>
                <Table
                  title={activeSection}
                  columns={columnsMap[activeSection]}
                  data={paginatedData}
                />
                <div className="pagination">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >Anterior
                  </button>
                  <span>Página {currentPage} de {totalPages}</span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >Siguiente
                    </button>
                  </div>
                {showForm && (
                  <div className="modal-eliminar-overlay">
                    <div className="modal-eliminar-content">
                      <UserForm onSubmit={handleCreateUser} />
                      <button
                        className="btn"
                        onClick={() => setShowForm(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </>
            ): activeSection === "Alertas" ? (
              <>
                <div className="header-actions-row">
                  <h2>Entidades</h2>
                  <button
                    className="btn btn-blue"
                    onClick={() => setShowEntityForm(true)}
                  >
                    Crear Entidad
                  </button>
                </div>
                <Table
                  title={activeSection}
                  columns={columnsMap[activeSection]}
                  data={paginatedData.map(item => ({
                      ...item,
                      extra_data: item.extra_data ? item.extra_data.flow_rate : "",
                      resolved: item.resolved ? "Resuelto" : "Pendiente",
                      sensor: item.sensor ? item.sensor.id : ""
                    }))}
                />
                <div className="pagination">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >Anterior
                  </button>
                  <span>Página {currentPage} de {totalPages}</span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >Siguiente
                    </button>
                  </div>
                {showEntityForm && (
                  <div className="modal-eliminar-overlay">
                    <div className="modal-eliminar-content">
                      <EntityForm onSubmit={handleCreateEntity} />
                      <button
                        className="btn"
                        onClick={() => setShowEntityForm(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : activeSection === "Configuración" ? (
              <Configuration />
            ) : activeSection === "Profile" ? (
              <Profile/>
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
        <div className="modal-eliminar-overlay">
          <div className="modal-eliminar-content">
            <h2 className="modal-eliminar-title">ELIMINAR</h2>
            <div className="modal-eliminar-actions">
              <button
                className="modal-eliminar-btn modal-eliminar-btn-yes"
                onClick={handleDeleteSensorConfirmed}
              >
                ✔
              </button>
              <button
                className="modal-eliminar-btn modal-eliminar-btn-no"
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