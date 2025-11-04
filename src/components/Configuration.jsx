import React, { useState } from "react";
import './styles/Configuration_and_profile.css'

function Configuration() {
  const [showAccountOptions, setShowAccountOptions] = useState(false);

  return (
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
              onClick={() => setShowAccountOptions(true)}
            >
              Cambiar Tema &nbsp;&nbsp;&nbsp;Oscuro/Claro
            </li>
            <li
              className="config-option"
              onClick={() => setShowAccountOptions(true)}
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
          {/* Aquí puedes colocar el contenido de opciones de cuenta */}
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
            <div style={{ fontWeight: "bold" }}>Administrador</div>
            <div>
              Rol
              <br />
              Administrador
            </div>
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
  );
}

export default Configuration;
