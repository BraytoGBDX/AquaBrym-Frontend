import '../home/styles/Register.css';
import logo from '../../assets/logo.png';
import registerImg from '../../assets/registro.png';
import googleIcon from '../../assets/google.png'; // Importa la imagen de Google
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="register-bg">
      <div className="register-card">
        <div className="register-img-side">
          <img src={registerImg} alt="Registro" className="register-illustration" />
        </div>
        <div className="register-form-side">
          <div className="register-form-box">
            <div className="register-logo">
              <img src={logo} alt="Logo" style={{ width: 48, height: 48 }} />
            </div>
            <h2>Register</h2>
            <p className="register-subtitle">
              Lorem ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <form>
              <input className="register-input" type="text" placeholder="Name" />
              <input className="register-input" type="text" placeholder="Last name" />
              <input className="register-input" type="email" placeholder="Email" />
              <input className="register-input" type="password" placeholder="Password" />
              <input className="register-input" type="password" placeholder="Confirm password" />
              <button className="register-accept-btn" type="submit">Accept</button>
            </form>
            <button className="register-google-btn" type="button">
              <img src={googleIcon} alt="Google" className="register-google-icon" />
              Sign up with Google
            </button>
            <div className="register-login-link">
              Already have an account? <a href="/login">Sign in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}