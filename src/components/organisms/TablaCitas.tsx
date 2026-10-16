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
  // Recuperamos las citas guardadas por el módulo de agendamiento.
  const citas = leerCitas();

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
              </tr>
            </thead>

            <tbody>
              {citas.map((cita) => (
                <tr key={cita.id}>
                  <td>{cita.clienteNombre}</td>
                  <td>{cita.mascota}</td>
                  <td>{cita.servicio}</td>
                  <td>
                    {new Date(cita.fecha).toLocaleString("es-CL")}
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

// Permite importarlo con: import TablaCitas from "...";
export default TablaCitas;