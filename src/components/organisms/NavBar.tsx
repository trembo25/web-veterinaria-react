import { Link, NavLink, useNavigate } from "react-router-dom";
import Boton from "../atoms/Boton";
import MenuDesplegable from "../molecules/MenuDesplegable";
import { useAuth } from "../../context/AuthContext";

function NavBar() {
  const navegar = useNavigate();
  const { usuario, logout } = useAuth();

  // true solo cuando inició sesión el administrador.
  const esAdmin = usuario?.rol === "admin";

  // La primera opción del menú cambia según quién inició sesión.
  const opcionPrincipal = esAdmin
    ? { texto: "Panel de control", alElegir: () => navegar("/admin") }
    : { texto: "Citas", alElegir: () => navegar("/citas") };

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
        {/* NavLink agrega la clase "active" al enlace de la página actual. */}
        <NavLink to="/" end>
          Inicio
        </NavLink>

        {/* Va al inicio y ManejoScroll baja hasta id="servicios". */}
        <Link to="/#servicios">Servicios</Link>

        <NavLink to="/nosotros">Nosotros</NavLink>
      </div>

      {/* Las acciones ocupan toda la segunda fila. */}
      <div className="vet-actions">
        {/* El admin no agenda citas, por eso a él no le mostramos este botón. */}
        {!esAdmin && (
          <Boton
            texto="Agendar Cita"
            variante="color"
            onClick={() => navegar("/agenda")}
          />
        )}

        <Boton
          texto="Contáctanos"
          onClick={() => navegar("/contacto")}
        />

        {/* El bloque de sesión va al final: queda en el extremo derecho. */}
        {usuario ? (
          <>
            <span className="vet-user">
              Hola, {usuario.nombre}
            </span>

            {/* Las tres rayas abren el menú de la cuenta. */}
            <MenuDesplegable
              opciones={[
                opcionPrincipal,
                {
                  texto: "Salir",
                  alElegir: cerrarSesion,
                },
              ]}
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