import { useEffect, useState } from "react";
import InsigniaPago from "../atoms/InsigniaPago";
import { obtenerCitas, eliminarCita, confirmarPago } from "../../data/Citas";
import type { Cita } from "../../types";

function TablaCitas() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Al abrir el panel pedimos todas las citas al microservicio.
  useEffect(() => {
    let cancelado = false;

    obtenerCitas()
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
  }, []);

  async function quitarCita(id: Cita["id"]) {
    if (!window.confirm("¿Estás seguro de eliminar esta cita?")) {
      return;
    }

    try {
      await eliminarCita(id);

      // Solo si el servidor la borró, la quitamos de la tabla.
      setCitas((actuales) => actuales.filter((cita) => cita.id !== id));
    } catch (err) {
      alert(
        err instanceof TypeError
          ? "No se pudo conectar con el servidor. Intente más tarde."
          : err instanceof Error
            ? err.message
            : "No se pudo eliminar la cita"
      );
    }
  }

  // El admin confirma que recibió una transferencia: pasa de "pendiente" a "pagado".
  function aprobarPago(cita: Cita) {
    if (!window.confirm(`¿Confirmas que recibiste la transferencia de ${cita.pago?.monto}?`)) {
      return;
    }

    confirmarPago(cita.id);

    setCitas((actuales) =>
      actuales.map((actual): Cita =>
        actual.id === cita.id && actual.pago
          ? { ...actual, pago: { ...actual.pago, estado: "pagado" } }
          : actual
      )
    );
  }

  return (
    <section className="admin-seccion">
      <h2 className="admin-titulo-seccion">
        Citas de los clientes
      </h2>

      {cargando ? (
        <p className="admin-vacio">
          Cargando citas...
        </p>
      ) : error !== "" ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : citas.length === 0 ? (
        <p className="admin-vacio">
          Todavía no hay citas registradas.
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">Cliente</th>
                <th scope="col">Mascota</th>
                <th scope="col">Servicio</th>
                <th scope="col">Fecha y hora</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {citas.map((cita) => (
                <tr key={cita.id}>
                  <td>{cita.clienteNombre}</td>
                  <td>{cita.mascota}</td>
                  <td>
                    {cita.servicio}

                    {/* Etiqueta del pago junto al servicio (sin agregar columnas).
                        El espacio va dentro, para que sin pago el texto quede igual. */}
                    {cita.pago && (
                      <>
                        {" "}
                        <InsigniaPago estado={cita.pago.estado} />
                      </>
                    )}
                  </td>
                  <td>
                    {new Date(cita.fecha).toLocaleString("es-CL")}
                  </td>
                  <td>
                    {/* Solo las transferencias pendientes se pueden confirmar. */}
                    {cita.pago?.estado === "pendiente" && (
                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm me-2"
                        onClick={() => aprobarPago(cita)}
                      >
                        Confirmar pago
                      </button>
                    )}

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => quitarCita(cita.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default TablaCitas;