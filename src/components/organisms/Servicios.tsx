import CardServicio from "../molecules/CardServicio";
import { useServicios } from "../../data/servicios";

function Servicios() {
  // Los servicios se piden al microservicio al abrir la página.
  const { servicios, cargando, error } = useServicios();

  return (
    <section id="servicios" className="seccion-servicios">
      <h2 className="titulo-seccion">
        Nuestros Servicios
      </h2>

      {cargando ? (
        <p>Cargando servicios...</p>
      ) : error !== "" ? (
        <p>{error}</p>
      ) : servicios.length === 0 ? (
        <p>No hay servicios disponibles por el momento.</p>
      ) : (
      <div className="servicios-grid">
  {servicios.map((servicio) => (
    <CardServicio
      key={servicio.id}
      id={servicio.id}
      titulo={servicio.titulo}
      descripcion={servicio.descripcion}
      imagen={servicio.imagen}
      precio={servicio.precio || ""}
      precioAnterior={servicio.precioAnterior}
    />
  ))}
</div>
      )}
    </section>
  );
}

export default Servicios;