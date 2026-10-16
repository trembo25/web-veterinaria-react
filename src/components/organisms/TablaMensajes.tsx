import { obtenerMensajes } from "../../data/mensajes";

function TablaMensajes() {
  // Los mensajes más nuevos quedan arriba.
  const mensajes = obtenerMensajes().sort((a, b) =>
    b.fecha.localeCompare(a.fecha)
  );

  return (
    <section className="admin-seccion">
      <h2 className="admin-titulo-seccion">
        Mensajes de contacto
      </h2>

      {mensajes.length === 0 ? (
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