// Direcciones de los microservicios del backend.
// Se pueden cambiar con un archivo .env en la raíz del proyecto (ver .env.example).
export const URL_USUARIOS =
  import.meta.env.VITE_USUARIOS_URL ?? "http://localhost:8081";

export const URL_AUTH =
  import.meta.env.VITE_AUTH_URL ?? "http://localhost:8086";

// Forma de los errores que devuelven usuarios y autenticacion (ErrorResponse en Java).
type ErrorApi = {
  mensaje?: string;
  campos?: Record<string, string>;
};

// Saca un texto legible del error que devuelve el microservicio.
// Si hay errores por campo (400), mostramos el primero; si no, el mensaje general.
async function leerError(respuesta: Response): Promise<string> {
  try {
    const datos: ErrorApi = await respuesta.json();
    const primerCampo = datos.campos ? Object.values(datos.campos)[0] : undefined;

    return primerCampo ?? datos.mensaje ?? "No se pudo completar la solicitud";
  } catch {
    return "No se pudo completar la solicitud";
  }
}

// Envía una petición con cuerpo JSON y devuelve la respuesta ya convertida.
// Si el backend responde con error (4xx/5xx), lanza un Error con su mensaje.
export async function enviarJson<T>(
  url: string,
  metodo: "POST" | "PUT",
  cuerpo: unknown
): Promise<T> {
  let respuesta: Response;

  try {
    respuesta = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuerpo),
    });
  } catch {
    // fetch solo falla así cuando no hay conexión (servicio apagado, CORS, sin red).
    throw new Error("No se pudo conectar con el servidor. Intente más tarde.");
  }

  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta));
  }

  // 204 No Content: no hay cuerpo que leer.
  if (respuesta.status === 204) {
    return undefined as T;
  }

  return respuesta.json();
}
