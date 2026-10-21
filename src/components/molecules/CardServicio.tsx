import { Link, useNavigate } from "react-router-dom";
import BotonVerDetalle from "../atoms/BotonVerDetalle";
import Servicios from "../organisms/Servicios";

// definimos las props con typeScript
interface CardServicioProps {
    id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  onClickDetails?: () => void;
}

function CardServicio({ id, titulo, descripcion, imagen, onClickDetails}: CardServicioProps) {
    const navigate = useNavigate();

  const handleVerDetalle = () => {
    // 👈 2. Usamos directamente la variable `id`
    navigate(`/detalle/${id}`);
  };
    return(
        <div className="card-servicio">
            {/*Contendor de la imagen*/}
            <div className="card-imagen-container">
                <img 
                className="card-imagen"
                src={imagen} 
                alt={titulo} />
            </div>
            {/* Contenido de la Card */}
            <div className="card-body">
                <h3 className="card-titulo">{titulo}</h3>
                <p className="card-descripcion">{descripcion}</p>
                {/*Usasmos nuestro boton ya creado anteriormente*/}
                
                <BotonVerDetalle id={id} /> 
                           
            </div>
        </div>
    );
}

export default CardServicio;