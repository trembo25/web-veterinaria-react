import Boton from "../atoms/Boton";

// definimos las props con typeScript
interface CardServicioProps {
  titulo: string;
  descripcion: string;
  imagen: string;
}

function CardServicio({ titulo, descripcion, imagen }: CardServicioProps) {
    return(
        <div className="card-servicio">
            {/*Contendor de la imagen*/}
            <div className="card-imagen-container">
                <img src={imagen} alt={titulo} className="card-imagen" />
            </div>
            {/* Contenido de la Card */}
            <div className="card-body">
                <h3 className="card-titulo">{titulo}</h3>
                <p className="card-descripcion">{descripcion}</p>
                {/*Usasmos nuestro boton ya creado anteriormente*/}
                <Boton texto="Ver Detalles" variante="color" />            
            </div>
        </div>
    );
}

export default CardServicio;