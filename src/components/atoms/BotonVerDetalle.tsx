import {Link } from "react-router-dom"
interface BotonProps {
  id: number;
}

function Boton({id}:BotonProps){


  return (
    <Link
      to={`/VerDetalle/${id}`}
      className="btn btn-primary">
       Ver Detalles
      </Link>
  );
}

export default Boton;