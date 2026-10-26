import { useState } from "react";
import InsigniaPago from "../atoms/InsigniaPago";
import type { Cita } from "../../types";

function leerCitas(): Cita[] {
  const guardadas = localStorage.getItem("citas");

  if (!guardadas) {
    return [];
  }

  try {
    const datos = JSON.parse(guardadas);

    // Solo utilizamos el contenido si es una lista.
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function TablaCitas() {
  const [citas, setCitas] = useState<Cita[]>(leerCitas);

  function eliminarCita(id: Cita["id"]) {
    if (!window.confirm("¿Estás seguro de eliminar esta cita?")) {
      return;
    }

    // se crea una lista sin la cita seleccionada
    const nuevasCitas = citas.filter((cita) => cita.id !== id);

    // Guardamos los cambios y actualizamos la tabla
    localStorage.setItem("citas", JSON.stringify(nuevasCitas));
    setCitas(nuevasCitas);
  }

  // El admin confirma que recibió una transferencia: pasa de "pendiente" a "pagado".
  function confirmarPago(cita: Cita) {
    if (!window.confirm(`¿Confirmas que recibiste la transferencia de ${cita.pago?.monto}?`)) {
      return;
    }

    const nuevasCitas = citas.map((actual): Cita =>
      actual.id === cita.id && actual.pago
        ? { ...actual, pago: { ...actual.pago, estado: "pagado" } }
        : actual
    );

    localStorage.setItem("citas", JSON.stringify(nuevasCitas));
    setCitas(nuevasCitas);
  }

  return (
    <section className="admin-seccion">
      <h2 className="admin-titulo-seccion">
        Citas de los clientes
      </h2>

      {citas.length === 0 ? (
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
                        onClick={() => confirmarPago(cita)}
                      >
                        Confirmar pago
                      </button>
                    )}

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => eliminarCita(cita.id)}
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