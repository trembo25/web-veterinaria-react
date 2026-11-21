import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FilaCita from "../molecules/FilaCita";
import Boton from "../atoms/Boton";

import { useAuth } from "../../context/AuthContext";
import { obtenerCitas, eliminarCita } from "../../data/Citas";
import { useServicios, buscarPrecio } from "../../data/servicios";
import type { Cita } from "../../types";

function TablaMisCitas() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const { usuario } = useAuth();
  const navegar = useNavigate();
  const email = usuario?.email;
  const { servicios } = useServicios();

  // Al abrir la página pedimos solo las citas de este cliente.
  useEffect(() => {
    if (!email) {
      return;
    }

    let cancelado = false;

    obtenerCitas(email)
      .then((datos) => {
        if (!cancelado) {
          setCitas(datos);
        }
      })
      .catch(() => {
        if (!cancelado) {
          setError("No se pudieron cargar las citas. Revise que el servicio de citas esté encendido.");
        }
      })
      .finally(() => {
        if (!cancelado) {
          setCargando(false);
        }
      });

    return () => {
      cancelado = true;
    };
  }, [email]);

  // Ordenadas por fecha y hora. Se copia la lista para no modificar el estado.
  const misCitas = [...citas].sort((a, b) => a.fecha.localeCompare(b.fecha));

  async function cancelarCita(cita: Cita) {
    const confirmar = window.confirm(
      `¿Cancelar la cita de ${cita.mascota}?`
    );

    if (!confirmar) {
      return;
    }

    try {
      await eliminarCita(cita.id);

      // Solo si el servidor la borró, la quitamos de la pantalla.
      setCitas((actuales) =>
        actuales.filter((actual) => actual.id !== cita.id)
      );
    } catch (err) {
      alert(
        err instanceof TypeError
          ? "No se pudo conectar con el servidor. Intente más tarde."
          : err instanceof Error
            ? err.message
            : "No se pudo cancelar la cita"
      );
    }
  }

  if (cargando) {
    return <p className="text-muted text-center">Cargando citas...</p>;
  }

  if (error !== "") {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
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
              precio={buscarPrecio(servicios, cita.servicio)}
              alCancelar={() => cancelarCita(cita)}
              // Ej: /pago/12 (el id de la cita).
              alIrAlPago={() => navegar(`/pago/${cita.id}`)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaMisCitas;