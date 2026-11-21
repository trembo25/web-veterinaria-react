import { useEffect, useState } from "react";
import type { Servicio } from "../types";

// Dirección del microservicio de servicios.
const URL_BASE = import.meta.env.VITE_SERVICIOS_URL ?? "http://localhost:8082";
const URL_SERVICIOS = `${URL_BASE}/servicios`;

// Lo que se envía al crear o editar: el id lo genera la base de datos.
export type DatosServicio = Omit<Servicio, "id">;

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

// ---------- Peticiones al microservicio ----------

// Trae todos los servicios (GET).
export async function obtenerServicios(): Promise<Servicio[]> {
  const respuesta = await fetch(URL_SERVICIOS);

  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta));
  }

  return respuesta.json();
}

// Crea un servicio nuevo (POST).
export async function crearServicio(datos: DatosServicio): Promise<Servicio> {
  const respuesta = await fetch(URL_SERVICIOS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta));
  }

  return respuesta.json();
}

// Reemplaza los datos de un servicio existente (PUT).
export async function actualizarServicio(id: number, datos: DatosServicio): Promise<Servicio> {
  const respuesta = await fetch(`${URL_SERVICIOS}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta));
  }

  return respuesta.json();
}

// Elimina un servicio (DELETE).
export async function eliminarServicio(id: number): Promise<void> {
  const respuesta = await fetch(`${URL_SERVICIOS}/${id}`, { method: "DELETE" });

  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta));
  }
}

// ---------- Hook para los componentes ----------

// Pide los servicios al abrir el componente y entrega tres estados:
// la lista, si todavía está cargando y si hubo un error.
// Lo usan la página de inicio, el detalle, agendar, mis citas y el pago.
export function useServicios() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelado = false;

    obtenerServicios()
      .then((datos) => {
        if (!cancelado) {
          setServicios(datos);
        }
      })
      .catch(() => {
        if (!cancelado) {
          setError("No se pudieron cargar los servicios. Revise que el servicio esté encendido.");
        }
      })
      .finally(() => {
        if (!cancelado) {
          setCargando(false);
        }
      });

    return () => {
      cancelado = true;
    };
  }, []);

  return { servicios, setServicios, cargando, error };
}

// ---------- Precio de un servicio ----------

// Minúsculas, sin espacios extra y sin tildes.
function normalizar(texto: string) {
  return texto
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

// Las citas guardan el nombre del servicio: con él buscamos su precio en la lista.
export function buscarPrecio(servicios: Servicio[], titulo: string) {
  const buscado = normalizar(titulo);

  return (
    servicios.find((servicio) => normalizar(servicio.titulo) === buscado)?.precio ||
    undefined
  );
}