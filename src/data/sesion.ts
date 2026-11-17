import type { Sesion } from "../types";

// La sesión se guarda en el navegador para no perderla al recargar la página.
// Solo se guarda el token y los datos públicos (nombre, email, rol): NUNCA la contraseña.
const CLAVE = "sesion";

// Lee la fecha de expiración (exp) que viene dentro del token.
// El token tiene 3 partes separadas por "."; la del medio es un JSON en Base64URL.
function tokenVencido(token: string): boolean {
  try {
    const parteDatos = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const datos = JSON.parse(atob(parteDatos)) as { exp?: number };

    // exp viene en segundos; Date.now() en milisegundos.
    return datos.exp === undefined || datos.exp * 1000 <= Date.now();
  } catch {
    return true; // un token que no se puede leer se trata como vencido
  }
}

export function leerSesion(): Sesion | null {
  const guardada = localStorage.getItem(CLAVE);

  if (!guardada) {
    return null;
  }

  try {
    const sesion: Sesion = JSON.parse(guardada);

    // Sesiones antiguas (sin token) o con el token vencido se descartan.
    if (!sesion.token || tokenVencido(sesion.token)) {
      borrarSesion();
      return null;
    }

    return sesion;
  } catch {
    borrarSesion();
    return null;
  }
}

export function guardarSesion(sesion: Sesion) {
  localStorage.setItem(CLAVE, JSON.stringify(sesion));
}

export function borrarSesion() {
  localStorage.removeItem(CLAVE);
}

// Cabecera para los endpoints protegidos (ej: GET /usuarios, panel de admin).
// Uso: fetch(url, { headers: { ...cabeceraAutorizacion() } })
export function cabeceraAutorizacion(): Record<string, string> {
  const sesion = leerSesion();
  return sesion ? { Authorization: `Bearer ${sesion.token}` } : {};
}
