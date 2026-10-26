import { useParams, Link, useNavigate } from "react-router-dom";
import { obtenerServicios } from "../data/servicios";
import Boton from "../components/atoms/Boton";

function VerDetalles() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const servicios = obtenerServicios();

  const servicio = servicios.find((s) => s.id === Number(id));

  if (!servicio) {
    return (
      <div className="container text-center py-5">
        <h2>Servicio no encontrado</h2>
        <Link to="/" className="btn btn-outline-primary mt-3">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
            <div className="row g-0">
              {/* Imagen del servicio */}
              <div className="col-md-6 position-relative">
                <img
                  src={servicio.imagen}
                  alt={servicio.titulo}
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover", minHeight: "280px" }}
                />
              </div>

              {/* Información del servicio */}
              <div className="col-md-6 p-4 d-flex flex-column justify-content-between">
                <div>
                  <span className="badge bg-light text-primary border mb-2 px-3 py-2 rounded-pill fw-semibold">
                    Detalle del Servicio
                  </span>
                  <h2 className="card-title fw-bold text-dark mb-3">
                    {servicio.titulo}
                  </h2>

                  <p className="card-text text-muted mb-4 lead fs-6">
                    {servicio.descripcion}
                  </p>

                  {/* Sección de Precios */}
                  <div className="d-flex align-items-baseline gap-2 mb-4">
                    {servicio.precioAnterior && (
                      <span className="text-decoration-line-through text-muted fs-5">
                        {servicio.precioAnterior}
                      </span>
                    )}
                    {servicio.precio && (
                      <span className="fs-2 fw-bold text-dark">
                        {servicio.precio}
                      </span>
                    )}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="d-flex flex-column gap-2 mt-3">
                  <Boton
                    texto="Agendar cita"
                    variante="color"
                    onClick={() => navigate("/citas")}
                  />
                  <Link
                    to="/"
                    className="btn btn-outline-secondary rounded-3 fw-semibold text-center py-2"
                  >
                    Volver al Inicio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerDetalles;