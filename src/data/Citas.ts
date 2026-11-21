import type { Cita, Pago } from "../types";

// Dirección del microservicio de citas.
const URL_BASE = import.meta.env.VITE_CITAS_URL ?? "http://localhost:8083";
const URL_CITAS = `${URL_BASE}/citas`;

// Lo que envía el formulario: el id lo genera la base de datos.
export type NuevaCita = Pick<
  Cita,
  "clienteEmail" | "clienteNombre" | "mascota" | "servicio" | "fecha"
>;

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

// ---------- Pagos (temporal, hasta que exista el microservicio de pagos) ----------

function leerPagos(): Record<string, Pago> {
  const guardados = localStorage.getItem("pagos");

  if (guardados === null) {
    return {};
  }

  try {
    const datos = JSON.parse(guardados);

    return typeof datos === "object" && datos !== null && !Array.isArray(datos)
      ? datos
      : {};
  } catch {
    return {};
  }
}

// Le agrega a la cita su pago, si lo tiene.
function conPago(cita: Cita): Cita {
  const pago = leerPagos()[String(cita.id)];

  return pago ? { ...cita, pago } : cita;
}

export function guardarPago(idCita: number, pago: Pago) {
  const pagos = leerPagos();
  pagos[String(idCita)] = pago;
  localStorage.setItem("pagos", JSON.stringify(pagos));
}

// El admin confirma una transferencia: el pago pasa de "pendiente" a "pagado".
export function confirmarPago(idCita: number) {
  const pagos = leerPagos();
  const pago = pagos[String(idCita)];

  if (!pago) {
    return;
  }

  pagos[String(idCita)] = { ...pago, estado: "pagado" };
  localStorage.setItem("pagos", JSON.stringify(pagos));
}

function borrarPago(idCita: number) {
  const pagos = leerPagos();
  delete pagos[String(idCita)];
  localStorage.setItem("pagos", JSON.stringify(pagos));
}

// ---------- Citas (microservicio) ----------

// Agenda una cita (POST).
export async function crearCita(nueva: NuevaCita): Promise<Cita> {
  const respuesta = await fetch(URL_CITAS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nueva),
  });

  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta));
  }

  return respuesta.json();
}

// Sin parámetro trae todas las citas (admin); con un email, solo las de ese cliente.
export async function obtenerCitas(clienteEmail?: string): Promise<Cita[]> {
  const url = clienteEmail
    ? `${URL_CITAS}?clienteEmail=${encodeURIComponent(clienteEmail)}`
    : URL_CITAS;

  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta));
  }

  const citas: Cita[] = await respuesta.json();

  return citas.map(conPago);
}

// Trae una sola cita por su id (GET /citas/{id}).
export async function obtenerCita(id: string | number): Promise<Cita> {
  const respuesta = await fetch(`${URL_CITAS}/${id}`);

  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta));
  }

  return conPago(await respuesta.json());
}

// Elimina una cita (DELETE) y también su pago guardado en el navegador.
export async function eliminarCita(id: number): Promise<void> {
  const respuesta = await fetch(`${URL_CITAS}/${id}`, { method: "DELETE" });

  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta));
  }

  borrarPago(id);
}