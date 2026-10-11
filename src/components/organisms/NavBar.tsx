import Boton from "../atoms/Boton";

function NavBar() {
  return (
    <nav className="navbar">
      {/* Enlaces de navegación */}
      <div className="nav-links">
        <a href="#inicio">Inicio</a>
        <a href="#servicios">Servicios</a>
        <a href="#nosotros">Nosotros</a>
      </div>

      {/* Uso de nuestro Átomo Botón */}
      <div className="nav-buttons">
        <Boton texto="Ingresar" variante="transparente" />
        <Boton texto="Agendar Cita" variante="color" />
      </div>
    </nav>
  );
}

export default NavBar;