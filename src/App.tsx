import "./App.css";
import { Route, Routes } from "react-router-dom";

import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import PanelAdmin from "./pages/PanelAdmin";
import Agendar from "./pages/Agenda";
import Citas from "./pages/Citas";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import RutaProtegida from "./routes/RutaProtegida";
import ManejoScroll from "./routes/ManejoScroll";
import VerDetalles from "./pages/VerDetalles";
import PagoCita from "./pages/PagoCita";
import RestablecerContrasena from "./pages/RestablecerContrasena";

function App() {
  return (
    <>
      {/* Sube al inicio de cada página, o baja a la sección del "#". */}
      <ManejoScroll />

      <Routes>
        {/* Páginas públicas. */}
        <Route path="/" element={<Inicio />} />

        <Route path="/login" element={<Login />} />

        <Route path="/registro" element={<Registro />} />

        {/* Restablecer la contraseña con un código simulado. */}
        <Route path="/restablecer-contrasena" element={<RestablecerContrasena />} />

        <Route path="/VerDetalle/:id" element={<VerDetalles />} />

        {/* Conectamos /admin con el panel y comprobamos el rol. */}
        <Route
          path="/admin"
          element={
            <RutaProtegida rol="admin">
              <PanelAdmin />
            </RutaProtegida>
          }
        />

        <Route
          path="/agenda"
          element={
            <RutaProtegida rol="cliente">
              <Agendar />
            </RutaProtegida>
          }
        />

        <Route
          path="/citas"
          element={
            <RutaProtegida rol="cliente">
              <Citas />
            </RutaProtegida>
          }
        />
                {/* Pagar una cita o ver su comprobante. :id es el id de la cita. */}
        <Route
          path="/pago/:id"
          element={
            <RutaProtegida rol="cliente">
              <PagoCita />
            </RutaProtegida>
          }
        />

        {/* Si una dirección no existe, mostramos un mensaje
            en lugar de dejar la pantalla completamente vacía. */}
        <Route
          path="*"
          element={
            <p style={{ padding: "24px", color: "#111" }}>
              Página no encontrada.
            </p>
          }
        />

        <Route path="/contacto" element={<Contacto />} />

        <Route path="/nosotros" element={<Nosotros />} />
      </Routes>
    </>
  );
}

export default App;