import React from "react";
import './styles/Configuration_and_profile.css'


function Profile() {
  return (
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
          <h3>AquaWatch</h3>
          <small>
            <strong>Administrador</strong>
          </small>
          <p>📧 aquaWhatch@gmail.com</p>
          <p>📞 +7461144910</p>
          <p>📞 +7641081079</p>
          <p>📷 aquaBrym.Whatch</p>
          <p>📘 aquaBrym.1</p>
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
  );
}

export default Profile;
