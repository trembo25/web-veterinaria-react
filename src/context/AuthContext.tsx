import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Sesion } from "../types";
import { iniciarSesion } from "../data/auth";
import {
  registrarUsuario,
  restablecerPassword,
  verificarCorreoRestablecer,
} from "../data/usuarios";
import { borrarSesion, guardarSesion, leerSesion } from "../data/sesion";

// "  Nacho@Gmail.com " → "nacho@gmail.com". El backend también lo hace,
// pero así lo que ve el usuario coincide con lo que se guarda.
function limpiarCorreo(correo: string) {
  return correo.trim().toLowerCase();
}

// Describe los datos y funciones que compartirá el contexto.
// Todas las funciones que hablan con el backend son async (devuelven una Promise)
// y, si algo falla, lanzan un Error con el mensaje que respondió el servidor.
type AuthContextProps = {
  usuario: Sesion | null;

  // POST /auth/login (autenticacion). Devuelve la sesión con el token.
  login: (correo: string, contrasena: string) => Promise<Sesion>;

  // POST /usuarios/registro (usuarios).
  registrar: (nombre: string, correo: string, contrasena: string) => Promise<void>;

  // Restablecer contraseña, paso 1: POST /usuarios/restablecer/verificar.
  revisarCorreoContrasena: (correo: string) => Promise<void>;

  // Restablecer contraseña, paso 2: PUT /usuarios/restablecer.
  restablecerContrasena: (correo: string, nuevaContrasena: string) => Promise<void>;

  logout: () => void;
};

// Comienza sin valor porque lo entregará AuthProvider.
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  // Al comenzar, intentamos recuperar una sesión guardada (si el token no venció).
  const [usuario, setUsuario] = useState<Sesion | null>(leerSesion);

  // Las cuentas ya no viven en el navegador: borramos la lista antigua,
  // que además tenía las contraseñas en texto plano.
  useEffect(() => {
    localStorage.removeItem("usuarios");
  }, []);

  async function login(correo: string, contrasena: string): Promise<Sesion> {
    const nuevaSesion = await iniciarSesion(limpiarCorreo(correo), contrasena);

    setUsuario(nuevaSesion);
    guardarSesion(nuevaSesion);

    return nuevaSesion;
  }

  async function registrar(nombre: string, correo: string, contrasena: string) {
    await registrarUsuario(nombre.trim(), limpiarCorreo(correo), contrasena);
  }

  async function revisarCorreoContrasena(correo: string) {
    await verificarCorreoRestablecer(limpiarCorreo(correo));
  }

  async function restablecerContrasena(correo: string, nuevaContrasena: string) {
    await restablecerPassword(limpiarCorreo(correo), nuevaContrasena);
  }

  function logout() {
    // El token no se guarda en el servidor (stateless): basta con olvidarlo.
    setUsuario(null);
    borrarSesion();
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
// (Se exporta junto al Provider a propósito; la regla solo afecta la recarga en caliente.)
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const contexto = useContext(AuthContext);

  if (contexto === undefined) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return contexto;
}
