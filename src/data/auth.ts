import { URL_AUTH, enviarJson } from "./api";
import type { Sesion } from "../types";

// Respuesta de POST /auth/login del microservicio autenticacion (puerto 8086).
type LoginResponse = {
  token: string;
  nombre: string;
  email: string;
  rol: Sesion["rol"];
  expiraEn: number;
};

// Pide el token. Si las credenciales son incorrectas, el backend responde 401
// y enviarJson lanza un Error con "Correo o contraseña incorrectos".
export async function iniciarSesion(
  email: string,
  password: string
): Promise<Sesion> {
  const datos = await enviarJson<LoginResponse>(`${URL_AUTH}/auth/login`, "POST", {
    email,
    password,
  });

  return {
    nombre: datos.nombre,
    email: datos.email,
    rol: datos.rol,
    token: datos.token,
  };
}
