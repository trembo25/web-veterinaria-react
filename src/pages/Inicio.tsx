import Carrusel from "../components/molecules/Carrusel";
import Header from "../components/organisms/Header";
import Servicios from "../components/organisms/Servicios";
import "../App.css";
import Footer from "../components/organisms/Footer";

function Inicio() {
  return (
    <div className="inicio-body">
      <Header />

      {/* Seccion principal (Hero) que contendra el Flexbox */}
      <section className="hero-seccion">
        
        {/* Columna Izquierda: Texto y Puntos claves */}
        <div className="hero-texto">
          <h2>Veterinario a domicilio bienestar para tu mascota, cero estrés para ti</h2>
          <p>
            Agenda la visita de un veterinario a domicilio en cuestión de minutos.
            Dale a tu compañero la tranquilidad de una consulta personalizada, sin viajes ni momentos de estrés.
          </p>

          {/* Lista de beneficios con checks */}
          <ul className="hero-lista">
            <li><span>✓</span> Veterinarios certificados</li>
            <li><span>✓</span> En Santiago y regiones</li>
            <li><span>✓</span> De lunes a domingo</li>
          </ul>
        </div>

        {/* Columna Derecha: Imagen destacada */}
        <div className="hero-imagen">
          <img 
            src="src/assets/images/veterinarioDomicilio.jpeg" 
            alt="Atención veterinaria a domicilio" 
          />
        </div>

      </section>

      {/* Componentes independientes que van debajo del Hero */}
      <Carrusel />
      <Servicios />
      <Footer/>
    </div>
  );
}

export default Inicio;