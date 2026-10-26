import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import type { Rol } from "../types";

type Props = {
  // Rol que puede acceder a esta página.
  rol: Rol;

  // Página que mostraremos si el usuario tiene permiso.
  children: ReactNode;
};

function RutaProtegida({ rol, children }: Props) {
  const { usuario } = useAuth();

  // Permite saber a qué ruta intentaba entrar el usuario.
  const ubicacion = useLocation();

  // Si no inició sesión, lo enviamos al login.
  if (!usuario) {
    return (
      <Navigate
        to="/login"

        // Recordamos el destino para volver después del login.
        state={{ from: ubicacion.pathname }}
        replace
      />
    );
  }

  // Si tiene sesión pero no el rol solicitado, vuelve al inicio.
  if (usuario.rol !== rol) {
    return <Navigate to="/" replace />;
  }

  // Si cumple las condiciones, mostramos la página protegida.
  return <>{children}</>;
}

export default RutaProtegida;