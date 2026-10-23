import type { Servicio } from "../types";

// Importamos las imágenes que ya tiene el proyecto.
// Conserva los nombres exactos de tus archivos.
import atencion from "../assets/images/atencion.jpeg";
import vacunacion from "../assets/images/vacuancion.jpeg";
import cirugia from "../assets/images/capacitados.jpeg";
import peluqueria from "../assets/images/peluqueria.jpeg";
import hospitalizacion from "../assets/images/hospitalizacion.jpeg";

// Lista que se utiliza cuando todavía no hay servicios guardados.
const serviciosIniciales: Servicio[] = [
  {
    id: 1,
    titulo: "Consulta Veterinaria",
    descripcion:
      "Ofrecemos consultas veterinarias para diagnosticar y tratar enfermedades en tus mascotas.",
    imagen: atencion,
    precio: "$23.000",
    
  },
  {
    id: 2,
    titulo: "Vacunación",
    descripcion:
      "Protege a tus mascotas con nuestro servicio de vacunación, asegurando su salud y bienestar.",
    imagen: vacunacion,
    precio: "$45.000"
  },
  {
    id: 3,
    titulo: "Cirugía Menor",
    descripcion:
      "Realizamos procedimientos quirúrgicos seguros y efectivos para el cuidado de tus mascotas.",
    imagen: cirugia,
    precio: "$89.000"
  },
  {
    id: 4,
    titulo: "Baño y Peluquería",
    descripcion:
      "Mantén a tus mascotas limpias y con estilo con nuestro servicio de baño y peluquería.",
    imagen: peluqueria,
    precio: "$25.000"
  },
  {
    id: 5,
    titulo: "Hospitalización",
    descripcion:
      "Ofrecemos hospitalización para mascotas que requieren atención médica continua.",
    imagen: hospitalizacion,
    precio: "$150.000"
  },
];

// Función compartida por la página pública y el administrador.
export function obtenerServicios(): Servicio[] {
  const guardados = localStorage.getItem("servicios");

  // Si nunca se guardaron cambios, mostramos los servicios originales.
  if (guardados === null) {
    return serviciosIniciales;
  }

  try {
    const datos = JSON.parse(guardados);

    return Array.isArray(datos) ? datos : serviciosIniciales;
  } catch {
    return serviciosIniciales;
  }
}

// Convierte la lista en texto y la guarda en el navegador.
export function guardarServicios(servicios: Servicio[]) {
  localStorage.setItem("servicios", JSON.stringify(servicios));
}

// Precio de un servicio a partir de su nombre (las citas guardan el nombre).
// Ej: "Vacunación" → "$45.000". Si no tiene precio, devuelve undefined.
export function obtenerPrecio(titulo: string) {
  return obtenerServicios().find((servicio) => servicio.titulo === titulo)?.precio;
}