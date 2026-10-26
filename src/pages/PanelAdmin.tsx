import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Boton from "../components/atoms/Boton";
import AdminServicios from "../components/organisms/AdminServicios";
import TablaCitas from "../components/organisms/TablaCitas";
import TablaMensajes from "../components/organisms/TablaMensajes";

import "../Admin.css";

function PanelAdmin() {
  const { usuario, logout } = useAuth();
  const navegar = useNavigate();

  function cerrarSesion() {
    logout();
    navegar("/", { replace: true });
  }

  return (
    <main className="admin-panel">
      <header className="admin-cabecera">
        <div>
          <h1>Panel de administración</h1>
          <p>Bienvenido/a, {usuario?.nombre}</p>
        </div>

        <div className="admin-acciones">
          <Boton
            texto="Ver sitio web"
            variante="transparente"
            onClick={() => navegar("/")}
          />

          <Boton
            texto="Cerrar sesión"
            variante="transparente"
            onClick={cerrarSesion}
          />
        </div>
      </header>

      <AdminServicios />

      <TablaCitas />

      <TablaMensajes />

    </main>
  );
}

export default PanelAdmin;