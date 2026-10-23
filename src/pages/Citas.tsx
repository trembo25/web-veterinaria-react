import { Link } from "react-router-dom";
import TablaMisCitas from "../components/organisms/TablaMisCitas";

function Citas() {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        {/* col-lg-10 (antes col-lg-8): más ancha para que Pagar y Cancelar
            quepan uno al lado del otro. */}
        <div className="col-12 col-lg-10">
          <div className="card shadow-sm p-4 mb-5 rounded">
            <h2 className="mb-4 text-center">
              Citas
            </h2>

            <TablaMisCitas />

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