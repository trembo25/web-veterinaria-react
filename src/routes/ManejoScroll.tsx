// Rutas: al cambiar de página sube arriba, o baja a la sección del "#".
// Lo usa App.tsx (va una sola vez, arriba de <Routes>).

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// No dibuja nada: solo mueve la pantalla cada vez que cambia la dirección.
function ManejoScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash !== "") {
      // Ejemplo: "/#servicios" → bajamos hasta el elemento con id="servicios".
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Página nueva sin "#": empezamos desde arriba, sin animación.
      // ("instant" porque Bootstrap activa el desplazamiento suave en todo el sitio).
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}

export default ManejoScroll;