import type { Servicio } from "../types";

import atencion from "../assets/images/atencion.jpeg";
import vacunacion from "../assets/images/vacuancion.jpeg";
import cirugia from "../assets/images/capacitados.jpeg";
import peluqueria from "../assets/images/peluqueria.jpeg";
import hospitalizacion from "../assets/images/hospitalizacion.jpeg";

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
    precio: "$45.000",
  },
  {
    id: 3,
    titulo: "Cirugía Menor",
    descripcion:
      "Realizamos procedimientos quirúrgicos seguros y efectivos para el cuidado de tus mascotas.",
    imagen: cirugia,
    precio: "$89.000",
  },
  {
    id: 4,
    titulo: "Baño y Peluquería",
    descripcion:
      "Mantén a tus mascotas limpias y con estilo con nuestro servicio de baño y peluquería.",
    imagen: peluqueria,
    precio: "$25.000",
  },
  {
    id: 5,
    titulo: "Hospitalización",
    descripcion:
      "Ofrecemos hospitalización para mascotas que requieren atención médica continua.",
    imagen: hospitalizacion,
    precio: "$150.000",
  },
];

export function obtenerServicios(): Servicio[] {
  const guardados = localStorage.getItem("servicios");

  if (guardados === null) {
    return serviciosIniciales;
  }

  try {
    const datos = JSON.parse(guardados);

    if (!Array.isArray(datos)) {
      return serviciosIniciales;
    }

    // Si un servicio guardado no tiene precio, usamos el del servicio
    // inicial con el mismo id (si existe).
    return datos.map((servicio: Servicio) => {
      if (servicio.precio) {
        return servicio;
      }

      const inicial = serviciosIniciales.find(
        (actual) => actual.id === servicio.id
      );

      return inicial?.precio
        ? { ...servicio, precio: inicial.precio }
        : servicio;
    });
  } catch {
    return serviciosIniciales;
  }
}

export function guardarServicios(servicios: Servicio[]) {
  localStorage.setItem("servicios", JSON.stringify(servicios));
}

// Minúsculas, sin espacios extra y sin tildes.
function normalizar(texto: string) {
  return texto
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function obtenerPrecio(titulo: string) {
  const buscado = normalizar(titulo);

  const coincide = (servicio: Servicio) =>
    normalizar(servicio.titulo) === buscado;

  // Primero el servicio guardado; si no tiene precio, el inicial.
  return (
    obtenerServicios().find(coincide)?.precio ||
    serviciosIniciales.find(coincide)?.precio
  );
}