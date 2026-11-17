import { useEffect, useState } from "react";

import { obtenerMensajes } from "../../data/mensajes";
import type { Mensaje } from "../../types";

function TablaMensajes() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Al abrir el panel pedimos los mensajes al microservicio.
  useEffect(() => {
    let cancelado = false;

    obtenerMensajes()
      .then((datos) => {
        if (!cancelado) {
          setMensajes(datos);
        }
      })
      .catch(() => {
        if (!cancelado) {
          setError("No se pudieron cargar los mensajes. Revise que el servicio de mensajería esté encendido.");
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

  return (
    <section className="admin-seccion">
      <h2 className="admin-titulo-seccion">
        Mensajes de contacto
      </h2>

      {cargando ? (
        <p className="admin-vacio">
          Cargando mensajes...
        </p>
      ) : error !== "" ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : mensajes.length === 0 ? (
        <p className="admin-vacio">
          Todavía no hay mensajes.
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Mensaje</th>
                <th scope="col">Fecha</th>
              </tr>
            </thead>

            <tbody>
              {mensajes.map((mensaje) => (
                <tr key={mensaje.id}>
                  <td>{mensaje.nombre}</td>
                  <td>
                    {/* Al hacer clic se abre el correo para responder. */}
                    <a href={`mailto:${mensaje.correo}`}>
                      {mensaje.correo}
                    </a>
                  </td>
                  {/* pre-line respeta los saltos de línea del mensaje. */}
                  <td style={{ whiteSpace: "pre-line" }}>
                    {mensaje.texto}
                  </td>
                  <td>
                    {new Date(mensaje.fecha).toLocaleString("es-CL")}
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

export default TablaMensajes;
