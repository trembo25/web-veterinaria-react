import { URL_USUARIOS, enviarJson } from "./api";

// Peticiones al microservicio usuarios (puerto 8081).

// POST /usuarios/registro → 201. El backend siempre crea la cuenta como "cliente".
export async function registrarUsuario(
  nombre: string,
  email: string,
  password: string
): Promise<void> {
  await enviarJson(`${URL_USUARIOS}/usuarios/registro`, "POST", {
    nombre,
    email,
    password,
  });
}

// POST /usuarios/restablecer/verificar → 204 si el correo es de un cliente.
export async function verificarCorreoRestablecer(email: string): Promise<void> {
  await enviarJson(`${URL_USUARIOS}/usuarios/restablecer/verificar`, "POST", {
    email,
  });
}

// PUT /usuarios/restablecer → 200 con la contraseña ya cambiada (y cifrada) en la base de datos.
export async function restablecerPassword(
  email: string,
  nuevaPassword: string
): Promise<void> {
  await enviarJson(`${URL_USUARIOS}/usuarios/restablecer`, "PUT", {
    email,
    nuevaPassword,
  });
}
