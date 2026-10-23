import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FilaCita from "../molecules/FilaCita";
import Boton from "../atoms/Boton";

import { useAuth } from "../../context/AuthContext";
import { obtenerCitas, guardarCitas } from "../../data/Citas";
import { obtenerPrecio } from "../../data/servicios";
import type { Cita } from "../../types";

function TablaMisCitas() {
  // Todas las citas guardadas (de todos los clientes).
  const [citas, setCitas] = useState<Cita[]>(obtenerCitas);

  const { usuario } = useAuth();
  const navegar = useNavigate();

  // Solo las del cliente con sesión, ordenadas por fecha y hora.
  const misCitas = citas
    .filter((cita) => cita.clienteEmail === usuario?.email)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));

  function cancelarCita(cita: Cita) {
    const confirmar = window.confirm(
      `¿Cancelar la cita de ${cita.mascota}?`
    );

    if (!confirmar) {
      return;
    }

    // Lista sin la cita cancelada; las de otros clientes se mantienen.
    const listaActualizada = citas.filter(
      (actual) => actual.id !== cita.id
    );

    guardarCitas(listaActualizada);
    setCitas(listaActualizada);
  }

  // Si el cliente no tiene citas, lo invitamos a agendar una.
  if (misCitas.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted mb-3">
          Aún no tienes citas agendadas.
        </p>

        <Boton
          texto="Agendar una cita"
          variante="color"
          onClick={() => navegar("/agenda")}
        />
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle text-start">
        <thead>
          <tr>
            <th scope="col">Mascota</th>
            <th scope="col">Servicio</th>
            <th scope="col">Fecha</th>
            <th scope="col">Hora</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {misCitas.map((cita) => (
            <FilaCita
              key={cita.id}
              cita={cita}
              // Las citas guardan el nombre del servicio: con él buscamos su precio.
              precio={obtenerPrecio(cita.servicio)}
              alCancelar={() => cancelarCita(cita)}
              // Ej: /pago/1761222000000 (el id de la cita).
              alIrAlPago={() => navegar(`/pago/${cita.id}`)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaMisCitas;