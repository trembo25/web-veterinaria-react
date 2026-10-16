import { useNavigate } from "react-router-dom";
import Boton from "../atoms/Boton";
import MenuDesplegable from "../molecules/MenuDesplegable";
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

            {/* Las tres rayas abren el menú de la cuenta. */}
            <MenuDesplegable
              opciones={[
                {
                  texto: "Citas",
                  // El admin ve las citas en su panel; el cliente, en /citas.
                  alElegir: () =>
                    navegar(usuario.rol === "admin" ? "/admin" : "/citas"),
                },
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