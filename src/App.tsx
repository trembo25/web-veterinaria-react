import "./App.css";
import { Route, Routes } from "react-router-dom";

import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import PanelAdmin from "./pages/PanelAdmin";
import Agendar from "./pages/Agenda";
import Citas from "./pages/Citas";

import RutaProtegida from "./routes/RutaProtegida";

function App() {
  return (
    <Routes>
      {/* Páginas públicas. */}
      <Route path="/" element={<Inicio />} />

      <Route path="/login" element={<Login />} />

      <Route path="/registro" element={<Registro />} />

      {/* Conectamos /admin con el panel y comprobamos el rol. */}
      <Route
        path="/admin"
        element={
          <RutaProtegida rol="admin">
            <PanelAdmin />
          </RutaProtegida>
        }
      />

      {/* Si una dirección no existe, mostramos un mensaje
          en lugar de dejar la pantalla completamente vacía. */}
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

      <Route
        path="*"
        element={
          <p style={{ padding: "24px", color: "#111" }}>
            Página no encontrada.
          </p>
        }
      />
    </Routes>
  );
}

export default App;