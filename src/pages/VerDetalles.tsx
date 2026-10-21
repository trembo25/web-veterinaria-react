import React from 'react';

import { useParams } from 'react-router-dom';

// Datos de ejemplo según las tarjetas de tu diseño
const productos = [
      {
    id: 1,
    titulo: 'Consulta Veterinaria',
    descripcion: "Ofrecemos consultas veterinarias para diagnosticar y tratar enfermedades en tus mascotas.",
    imagen: "/images/atencion.jpeg"// ajusta la ruta a tu imagen
  },
  {
     id: 2,
    titulo: "Vacunación",
    descripcion:
      "Protege a tus mascotas con nuestro servicio de vacunación, asegurando su salud y bienestar.",
    imagen: "src/assets/images/vacuancion.jpeg"
  },
  {
  id: 3,
    titulo: "Cirugía Menor",
    descripcion:
      "Realizamos procedimientos quirúrgicos seguros y efectivos para el cuidado de tus mascotas.",
    imagen: "src/assets/images/capacitados.jpeg"
  },
   {
 id: 4,
    titulo: "Baño y Peluquería",
    descripcion:
      "Mantén a tus mascotas limpias y con estilo con nuestro servicio de baño y peluquería.",
    imagen: "src/assets/images/peluqueria.jpeg"
  },
  {
    id: 5,
    titulo: "Hospitalización",
    descripcion:
      "Ofrecemos hospitalización para mascotas que requieren atención médica continua.",
    imagen: "src/assets/images/hospitalizacion.jpeg"
  },
]

function VerDetalle() {
    const {id} = useParams()

    const producto = productos.find(
        producto => producto.id === Number(id)
    )
  return (
    <div>
      <h1> Detalle Productos</h1>
      <img 
      src={producto?.imagen}
      alt={producto?.titulo}
      style={{ width: '300px'}}
       />
       <h2> {producto?.titulo}</h2>
       <p>{producto?.descripcion}</p>
    </div>
  );
}

export default VerDetalle;