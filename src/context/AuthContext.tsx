import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Usuario, Sesion } from "../types";

// Cuenta de administrador para probar el proyecto.
// Usaremos una contraseña de al menos 8 caracteres.
const ADMIN: Usuario = {
  nombre: "Administrador",
  email: "admin@sanmarcos.cl",
  password: "Admin1234",
  rol: "admin",
};

// Lee las cuentas creadas desde el navegador.
function leerUsuarios(): Usuario[] {
  const guardados = localStorage.getItem("usuarios");

  // Si aún no existen cuentas guardadas, devolvemos una lista vacía.
  if (!guardados) {
    return [];
  }

  // Intentamos convertir el texto guardado en una lista.
  try {
    return JSON.parse(guardados);
  } catch {
    // Si el contenido no es un JSON válido, evitamos que la app se caiga.
    return [];
  }
}

// Recupera la sesión cuando se abre o recarga la aplicación.
function leerSesion(): Sesion | null {
  const guardada = localStorage.getItem("sesion");

  if (!guardada) {
    return null;
  }

  try {
    return JSON.parse(guardada);
  } catch {
    return null;
  }
}

// Describe los datos y funciones que compartirá el contexto.
type AuthContextProps = {
  usuario: Sesion | null;

  login: (
    correo: string,
    contrasena: string
  ) => Sesion | null;

  registrar: (
    nombre: string,
    correo: string,
    contrasena: string
  ) => string | null;

  // Restablecer contraseña, paso 1: revisa que el correo sea de un cliente.
  // Devuelve un mensaje de error, o null si se puede continuar.
  revisarCorreoContrasena: (correo: string) => string | null;

  // Restablecer contraseña, paso 2: guarda la nueva contraseña.
  // Devuelve un mensaje de error, o null si se guardó.
  restablecerContrasena: (
    correo: string,
    nuevaContrasena: string
  ) => string | null;

  logout: () => void;
};

// Creamos el contexto.
// Comienza sin valor porque lo entregará AuthProvider.
const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

// "children" representa los componentes que quedarán dentro del proveedor.
type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  // null significa que no hay una sesión iniciada.
  // Al comenzar, intentamos recuperar una sesión guardada.
  const [usuario, setUsuario] = useState<Sesion | null>(
    leerSesion
  );

  function login(
    correo: string,
    contrasena: string
  ): Sesion | null {
    // Quitamos espacios y convertimos el correo a minúsculas.
    const correoLimpio = correo.trim().toLowerCase();

    // Unimos la cuenta del administrador con las cuentas registradas.
    const usuarios = [ADMIN, ...leerUsuarios()];

    // Buscamos una cuenta cuyo correo y contraseña coincidan.
    const encontrado = usuarios.find(
      (cuenta) =>
        cuenta.email === correoLimpio &&
        cuenta.password === contrasena
    );

    // Si no existe una coincidencia, el login falla.
    if (!encontrado) {
      return null;
    }

    // Creamos la sesión sin copiar la contraseña.
    const nuevaSesion: Sesion = {
      nombre: encontrado.nombre,
      email: encontrado.email,
      rol: encontrado.rol,
    };

    // Actualizamos el estado para que React muestre la sesión actual.
    setUsuario(nuevaSesion);

    // Guardamos una copia para recuperarla al recargar.
    localStorage.setItem(
      "sesion",
      JSON.stringify(nuevaSesion)
    );

    // Devolvemos la sesión para que el formulario revise el rol.
    return nuevaSesion;
  }

  function registrar(
    nombre: string,
    correo: string,
    contrasena: string
  ): string | null {
    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim().toLowerCase();

    // Validaciones del registro.
    if (nombreLimpio === "") {
      return "Debe ingresar su nombre";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) {
      return "Debe ingresar un correo válido";
    }

    if (contrasena.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }

    const usuarios = leerUsuarios();

    // Revisamos también el correo reservado para el administrador.
    const correoOcupado =
      correoLimpio === ADMIN.email ||
      usuarios.some(
        (cuenta) => cuenta.email === correoLimpio
      );

    if (correoOcupado) {
      return "Ese correo ya está registrado";
    }

    // Las cuentas creadas desde el registro siempre son clientes.
    const nuevoUsuario: Usuario = {
      nombre: nombreLimpio,
      email: correoLimpio,
      password: contrasena,
      rol: "cliente",
    };

    // Creamos una nueva lista incluyendo la cuenta nueva.
    const listaActualizada = [...usuarios, nuevoUsuario];

    localStorage.setItem(
      "usuarios",
      JSON.stringify(listaActualizada)
    );

    // null significa que el registro terminó sin errores.
    return null;
  }

  // Restablecer contraseña, paso 1.
  // Revisa que el correo pertenezca a una cuenta de cliente.
  function revisarCorreoContrasena(correo: string): string | null {
    const correoLimpio = correo.trim().toLowerCase();

    // El administrador está escrito en el código (constante ADMIN),
    // no en localStorage, así que su contraseña no se cambia aquí.
    if (correoLimpio === ADMIN.email) {
      return "La contraseña del administrador no se puede restablecer desde aquí";
    }

    const existe = leerUsuarios().some(
      (cuenta) => cuenta.email === correoLimpio
    );

    if (!existe) {
      return "No encontramos una cuenta con ese correo";
    }

    // null significa que se puede continuar al paso 2.
    return null;
  }

  // Restablecer contraseña, paso 2.
  // Cambia la contraseña de la cuenta y la guarda en localStorage.
  function restablecerContrasena(
    correo: string,
    nuevaContrasena: string
  ): string | null {
    // Volvemos a revisar el correo: así esta función nunca cambia
    // la contraseña del administrador ni de una cuenta que no existe.
    const problemaCorreo = revisarCorreoContrasena(correo);

    if (problemaCorreo !== null) {
      return problemaCorreo;
    }

    if (nuevaContrasena.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }

    const correoLimpio = correo.trim().toLowerCase();
    const usuarios = leerUsuarios();

    // Solo el contexto conoce la contraseña guardada: el formulario nunca la ve.
    const cuenta = usuarios.find(
      (actual) => actual.email === correoLimpio
    );

    if (cuenta?.password === nuevaContrasena) {
      return "La nueva contraseña debe ser distinta a la anterior";
    }

    // Copiamos la lista cambiando solo la contraseña de esa cuenta.
    const listaActualizada = usuarios.map((actual) =>
      actual.email === correoLimpio
        ? { ...actual, password: nuevaContrasena }
        : actual
    );

    localStorage.setItem(
      "usuarios",
      JSON.stringify(listaActualizada)
    );

    // null significa que la contraseña se cambió sin errores.
    return null;
  }

  function logout() {
    // Quitamos la sesión del estado y del almacenamiento.
    setUsuario(null);
    localStorage.removeItem("sesion");
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        registrar,
        revisarCorreoContrasena,
        restablecerContrasena,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Esta función permite consultar el contexto desde otros componentes.
export function useAuth() {
  const contexto = useContext(AuthContext);

  // Detecta si olvidamos envolver la aplicación con AuthProvider.
  if (contexto === undefined) {
    throw new Error(
      "useAuth debe utilizarse dentro de AuthProvider"
    );
  }

  return contexto;
}