import { Link } from "react-router-dom";

function Citas() {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow-sm p-4 mb-5 rounded">
            <h2 className="mb-4 text-center">
              Citas
            </h2>

            <p className="text-muted text-center mb-3">
              Aquí aparecerán tus citas.
            </p>

            <div className="mt-3 text-center">
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

export default Citas;