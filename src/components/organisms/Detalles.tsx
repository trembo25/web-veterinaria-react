import React from 'react';
import CardServicio from '../molecules/CardServicio';

// Interfaz para el objeto de servicio
export interface Servicio {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
}

interface DetallesProps {
    
  servicios: Servicio[];
  onSelectServicio?: (servicio:Servicio) => void;
}

function Detalles({ servicios, onSelectServicio }: DetallesProps) {
  return (
    <section className="detalles-container">
      <div className="servicios-grid">
        {servicios.map((servicio) => (
          <CardServicio
            key={servicio.id}
            titulo={servicio.titulo}
            descripcion={servicio.descripcion}
            imagen={servicio.imagen}
            onClickDetails={()=> onSelectServicio &&  onSelectServicio(servicio)}
          />
        ))}
      </div>
    </section>
  );
}

export default Detalles;