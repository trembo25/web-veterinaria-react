import CardServicio from "../molecules/CardServicio";
import { obtenerServicios } from "../../data/Servicios";

function Servicios() {
  // Leemos la lista actual cada vez que se renderiza este componente.
  const servicios = obtenerServicios();

  return (
    <section id="servicios" className="seccion-servicios">
      <h2 className="titulo-seccion">
        Nuestros Servicios
      </h2>

      {servicios.length === 0 ? (
        <p>No hay servicios disponibles por el momento.</p>
      ) : (
        <div className="servicios-grid">
          {servicios.map((servicio) => (
            <CardServicio
              key={servicio.id}
              titulo={servicio.titulo}
              descripcion={servicio.descripcion}
              imagen={servicio.imagen}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Servicios;