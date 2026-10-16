import { useNavigate } from "react-router-dom";
import Boton from "../atoms/Boton";
import { useAuth } from "../../context/AuthContext";

function NavBar() {
  const navegar = useNavigate();
  const { usuario, logout } = useAuth();

  function cerrarSesion() {
    logout();
    navegar("/");
  }

  return (
    <nav
      className="vet-nav"
      aria-label="Navegación principal"
    >
      {/* Estos enlaces se muestran en la primera fila. */}
      <div className="vet-links">
        <a href="#inicio">Inicio</a>
        <a href="#servicios">Servicios</a>
        <a href="#nosotros">Nosotros</a>
      </div>

      {/* Las acciones ocupan toda la segunda fila. */}
      <div className="vet-actions">
        <Boton
          texto="Agendar Cita"
          variante="color"
          onClick={() => navegar("/agenda")}
        />

        <Boton texto="Contáctanos" />

        {/* El bloque de sesión va al final: queda en el extremo derecho. */}
        {usuario ? (
          <>
            <span className="vet-user">
              Hola, {usuario.nombre}
            </span>

            {usuario.rol === "admin" && (
              <Boton
                texto="Volver al panel"
                variante="transparente"
                onClick={() => navegar("/admin")}
              />
            )}

            <Boton
              texto="Salir"
              variante="transparente"
              onClick={cerrarSesion}
            />
          </>
        ) : (
          <Boton
            texto="Ingresar"
            variante="transparente"
            onClick={() => navegar("/login")}
          />
        )}
      </div>
    </nav>
  );
}

export default NavBar;