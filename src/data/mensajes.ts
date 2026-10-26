import type { Mensaje } from "../types";

export function obtenerMensajes(): Mensaje[] {
  const guardados = localStorage.getItem("mensajes");

  if (guardados === null) {
    return [];
  }

  try {
    const datos = JSON.parse(guardados);

    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

export function guardarMensajes(mensajes: Mensaje[]) {
  localStorage.setItem("mensajes", JSON.stringify(mensajes));
}