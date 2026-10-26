import type { Cita, Pago } from "../types";

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

// Guarda el pago dentro de su cita y devuelve la cita ya actualizada.
export function guardarPago(idCita: number, pago: Pago) {
  const citas = obtenerCitas().map((cita) =>
    cita.id === idCita ? { ...cita, pago } : cita
  );

  guardarCitas(citas);

  return citas.find((cita) => cita.id === idCita);
}