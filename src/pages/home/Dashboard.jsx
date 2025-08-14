import './styles/Dashboard.css';
import agua from '../../assets/manos-agua.png'
import tomando_agua from '../../assets/tomando-agua.png'
import logo from '../../assets/logo.png'
import how1 from '../../assets/1.jpg'
import how2 from '../../assets/2.png'
import how3 from '../../assets/3.png'
import regar from '../../assets/regando.png'
import tubo from '../../assets/tubo.png'
import cerro from '../../assets/cerro.png'
import ticket from '../../assets/ticket.png'
import aspersor from '../../assets/aspersor.png'
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo AquaWatch" />
        </div>
        <nav>
          <a href="#" className="active">Inicio</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <div className="actions">
          <button className="btn login" onClick={() => navigate('/login')}>Inicia Sesión</button>
          <button className="btn register" onClick={() => navigate('/register')}>Regístrate</button>
        </div>
      </header>

      <div className="content">
        <section className="text">
          <h1><span className="highlight">AquaWatch</span>: Tecnología que cuida cada gota.</h1>
          <p>
            Con AquaWatch, buscamos transformar la manera en que se gestiona este recurso vital,
            integrando tecnología accesible para crear conciencia y generar un impacto sustentable
            desde lo cotidiano.
          </p>
        </section>

        <section className="image">
          <img src={agua} alt="Mano con agua" />
        </section>
      </div>
        <div className="hero-container">
          <section className="hero-text">
            <h1>
              Una vida saludable empieza con <br />
              <span className="highlight">agua</span><br />
              de calidad
            </h1>
            <p>Por eso, nuestro objetivo es que cada gota cuente, asegurando un consumo eficiente que cuide tanto de tu bienestar como del planeta.</p>
          </section>

          <div className="hero-image">
            <img src={tomando_agua} alt="Hombre tomando agua" />
          </div>

          <section className="objective" id="nosotros">
            <div className="icon-title">
              <h2>
                Nuestro objetivo en <span className="highlight">AquaWatch</span>
              </h2>
            </div>
            <p className="description">
              Ofrecer un sistema inteligente compuesto por un dispositivo de monitoreo hídrico y
              que permita medir, analizar y promover el uso responsable del agua en hogares o instituciones,
              contribuyendo a la sostenibilidad y eficiencia del recurso.
            </p>
          </section>
        </div>
        <div className="como-container">
          <h2 className="como-title">¿Cómo Funciona?</h2>

          <div className="pasos">
            <div className="paso">
              <div className="numero">1</div>
              <p>Se instala un dispositivo de monitoreo que registra el consumo de agua en tiempo real.</p>
              <img src={how1} alt="Paso 1" />
            </div>

            <div className="paso">
              <div className="numero">2</div>
              <p>Los datos se envían automáticamente a un dashboard web, accesible desde cualquier dispositivo.</p>
              <img src={how2} alt="Paso 2" />
            </div>

            <div className="paso">
              <div className="numero">3</div>
              <p>Cuando el sistema detecta un uso inusual o constante, envía una alerta al usuario para tomar acción inmediata.</p>
              <img src={how3} alt="Paso 3" />
              </div>
            </div>
            <div className="hero-image">
            <img src={regar} alt="Hombre tomando agua" />
            </div>
        </div>
        <div className="impacto-container">
          <h2 className="impacto-title">🌿 Impacto del Proyecto</h2>
          <p className="impacto-subtitle">
            A través de un diagnóstico del entorno, se evidenció la ausencia de soluciones que brinden visibilidad en tiempo real del uso del recurso, lo que dificulta la adopción de prácticas sostenibles. 
            El proyecto AquaWatch surge como respuesta directa a esta necesidad, con el objetivo general de crear un sistema de monitoreo hídrico inteligente que promueva el uso responsable del agua mediante el análisis de datos.
          </p>

          <div className="impacto-grid">
            <div className="impacto-card">
              <img src={tubo} alt="Impacto social" />
              <h3>📌 Social</h3>
              <p>Fomenta una cultura de ahorro y responsabilidad en el uso del agua, tanto en hogares como en escuelas, oficinas o instituciones públicas.</p>
            </div>

            <div className="impacto-card">
              <img src={aspersor} alt="Impacto tecnológico" />
              <h3>💡 Tecnológico</h3>
              <p>Integra sensores inteligentes, procesamiento de datos y visualización web para abordar una problemática ambiental real.</p>
            </div>

            <div className="impacto-card">
              <img src={cerro} alt="Impacto ambiental" />
              <h3>🌍 Ambiental</h3>
              <p>Contribuye a disminuir el desperdicio hídrico y apoya directamente en la lucha contra la escasez del agua.</p>
            </div>

            <div className="impacto-card">
              <img src={ticket} alt="Impacto económico" />
              <h3>💰 Económico</h3>
              <p>Permite reducir los costos derivados del consumo excesivo, incentivando una gestión eficiente de los recursos.</p>
            </div>
          </div>
        </div>
        <div className="cierre-footer-container">
          <section className="mensaje-final">
            <div className="mensaje-izquierda">
              <h1>
                Únete al<br />
                cambio digital<br />
                hacia un<br />
                futuro más<br />
                responsable.
              </h1>
            </div>

            <div className="mensaje-derecha">
              <p>😊 Te invitamos a explorar nuestro sitio y descubrir cómo la tecnología puede ayudarte a cuidar uno de los recursos más valiosos: el agua.</p>
              <p>🌐 Este sitio fue creado para impulsar una cultura de responsabilidad y sostenibilidad. Aquí encontrarás herramientas, información y tecnología pensadas para ayudarte a tomar mejores decisiones y reducir el desperdicio.</p>
              <p>💙 Cada gota cuenta, y tú puedes hacer la diferencia.</p>
            </div>
          </section>

          <footer className="footer" id='contacto'>
            <div className="footer-left">
              <h2>AquaWatch</h2>
              <p>Sistema de Monitoreo Inteligente del Agua</p>
            </div>

            <div className="footer-center">
              <p>Desarrollado por estudiantes de la Universidad Tecnológica de Xicotepec de Juárez</p>
              <p>Proyecto Integrador</p>
            </div>

            <div className="footer-right">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </footer>
        </div>
      </div>
  );
}