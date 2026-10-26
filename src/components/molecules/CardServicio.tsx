import BotonVerDetalle from "../atoms/BotonVerDetalle";

// 1. Asegúrate de declarar la interfaz con los precios
interface CardServicioProps {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  precio?: string;
  precioAnterior?: string;
}

// 2. Aplica la interfaz a la función
function CardServicio({ 
  id, 
  titulo, 
  descripcion, 
  imagen, 
  precio, 
  precioAnterior 
}: CardServicioProps) {
  return (
    <div className="card-servicio h-100 d-flex flex-column">
      <div className="card-imagen-container">
        <img className="card-imagen" 
        src={imagen} 
        alt={titulo} />
      </div>

      <div className="card-body d-flex flex-column flex-grow-1">
        <h3 className="card-titulo">{titulo}</h3>
        
        <p className="card-descripcion flex-grow-1">{descripcion}</p>

        {/* Sección del fondo con los precios y el botón alineado */}
        <div className="mt-auto">
          <div className="card-precios">
            {precioAnterior && (
              <span className="precio-anterior">{precioAnterior}</span>
            )}
            {precio && <span className="precio-actual">{precio}</span>}
          </div>

          <div className="mt-2">
            <BotonVerDetalle id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardServicio;