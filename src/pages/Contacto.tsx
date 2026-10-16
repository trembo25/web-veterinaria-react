import { Link } from "react-router-dom";
import DatosContacto from "../components/molecules/DatosContacto";
import FormContacto from "../components/organisms/FormContacto";

function Contacto() {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow-sm p-4 mb-5 rounded">
            <h2 className="mb-2 text-center">
              Contáctanos
            </h2>

            <p className="text-muted text-center mb-4">
              ¿Tienes dudas? Escríbenos y te responderemos a la brevedad.
            </p>

            {/* En escritorio: datos a la izquierda y formulario a la derecha.
                En celular: los datos quedan arriba del formulario. */}
            <div className="row g-4 text-start">
              <div className="col-12 col-md-5">
                <DatosContacto />
              </div>

              <div className="col-12 col-md-7">
                <FormContacto />
              </div>
            </div>

            <div className="mt-4 text-center">
              <Link to="/">
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;