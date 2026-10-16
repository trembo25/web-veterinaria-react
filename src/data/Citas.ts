import type { Cita } from "../types";

export function obtenerCitas(): Cita[] {
  const guardadas = localStorage.getItem("citas");

  if (guardadas === null) {
    return [];
  }

  try {
    const datos = JSON.parse(guardadas);

    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

export function guardarCitas(citas: Cita[]) {
  localStorage.setItem("citas", JSON.stringify(citas));
}