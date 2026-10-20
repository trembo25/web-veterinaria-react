import React from 'react';
import Detalles, { type Servicio } from '../components/organisms/Detalles';

// Datos de ejemplo según las tarjetas de tu diseño
const listaServicios: Servicio[] = [
  {
    id: 1,
    titulo: 'Baño y Peluquería',
    descripcion: 'Mantén a tus mascotas limpias y con estilo con nuestro servicio de baño y peluquería.',
    imagen: '/assets/bano.jpg', // ajusta la ruta a tu imagen
  },
  {
    id: 2,
    titulo: 'Hospitalización',
    descripcion: 'Ofrecemos hospitalización para mascotas que requieren atención médica continua.',
    imagen: '/assets/hospitalizacion.jpg',
  },
  {
    id: 3,
    titulo: 'Consulta Domicilio',
    descripcion: 'vamos directo a tu hogar a ver a tu peludito',
    imagen: '/assets/veterinarioDomicilio.jpeg',
  },
];

function VerDetalle() {
  return (
    <div className="page-ver-detalle">
      {/* Puedes agregar aquí tu Header o NavBar si los tienes en organisms */}
      <h1>Nuestros Servicios</h1>
      
      {/* Llamamos al componente Detalles pasándole los datos */}
      <Detalles servicios={listaServicios} />
    </div>
  );
}

export default VerDetalle;