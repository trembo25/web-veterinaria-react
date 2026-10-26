// Organismo: llamado final con los botones "Agendar cita" y "Contáctanos".
// Lo usa la página Nosotros.

import { useNavigate } from "react-router-dom";
import Boton from "../atoms/Boton";

function NosotrosLlamado() {
  const navegar = useNavigate();

  return (
    <section className="nosotros-seccion">
      <div className="nosotros-llamado">
        <h2>¿Quieres que conozcamos a tu mascota?</h2>
        <p>Agenda una hora o escríbenos si tienes dudas.</p>

        <div className="d-flex flex-wrap gap-3 justify-content-center">
          <Boton
            texto="Agendar cita"
            variante="color"
            onClick={() => navegar("/agenda")}
          />

          <Boton
            texto="Contáctanos"
            variante="transparente"
            onClick={() => navegar("/contacto")}
          />
        </div>
      </div>
    </section>
  );
}

export default NosotrosLlamado;