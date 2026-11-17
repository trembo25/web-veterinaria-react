import type { Mensaje } from "../types";

// Dirección del microservicio de mensajería.
// Si algún día cambia, se puede definir VITE_MENSAJERIA_URL en un archivo .env.
const URL_BASE = import.meta.env.VITE_MENSAJERIA_URL ?? "http://localhost:8081";
const URL_MENSAJES = `${URL_BASE}/api/mensajes`;

type NuevoMensaje = Pick<Mensaje, "nombre" | "correo" | "texto">;

type ErrorApi = {
  mensaje?: string;
  errores?: Record<string, string>;
};

// Saca un texto legible del error que devuelve el microservicio.
async function leerError(respuesta: Response): Promise<string> {
  try {
    const datos: ErrorApi = await respuesta.json();
    const primerError = datos.errores ? Object.values(datos.errores)[0] : undefined;

    return primerError ?? datos.mensaje ?? "No se pudo completar la solicitud";
  } catch {
    return "No se pudo completar la solicitud";
  }
}

// Envía un mensaje del formulario de contacto (POST).
export async function enviarMensaje(nuevo: NuevoMensaje): Promise<Mensaje> {
  const respuesta = await fetch(URL_MENSAJES, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevo),
  });

  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta));
  }

  return respuesta.json();
}

// Trae todos los mensajes (GET). Ya vienen ordenados: los más nuevos primero.
export async function obtenerMensajes(): Promise<Mensaje[]> {
  const respuesta = await fetch(URL_MENSAJES);

  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta));
  }

  return respuesta.json();
}
