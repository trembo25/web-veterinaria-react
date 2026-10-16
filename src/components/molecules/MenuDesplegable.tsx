import { useEffect, useRef, useState } from "react";
import BotonMenu from "../atoms/BotonMenu";

// Cada opción del menú: el texto que se ve y lo que pasa al elegirla.
type Opcion = {
  texto: string;
  alElegir: () => void;
};

type Props = {
  opciones: Opcion[];
};

function MenuDesplegable({ opciones }: Props) {
  // true = la lista se ve, false = la lista está oculta.
  const [abierto, setAbierto] = useState(false);

  // Referencia al contenedor, para saber si un clic fue dentro o fuera.
  const contenedor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Con el menú cerrado no hay nada que escuchar.
    if (!abierto) {
      return;
    }

    // Cierra el menú si el clic fue fuera del contenedor.
    const cerrarSiClicFuera = (e: PointerEvent) => {
      if (!contenedor.current?.contains(e.target as Node)) {
        setAbierto(false);
      }
    };

    // Cierra el menú al presionar la tecla Esc.
    const cerrarConEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
      }
    };

    document.addEventListener("pointerdown", cerrarSiClicFuera);
    document.addEventListener("keydown", cerrarConEsc);

    // Al cerrarse (o desmontarse) quitamos los oyentes para no acumularlos.
    return () => {
      document.removeEventListener("pointerdown", cerrarSiClicFuera);
      document.removeEventListener("keydown", cerrarConEsc);
    };
  }, [abierto]);

  return (
    <div className="menu-desplegable" ref={contenedor}>
      <BotonMenu abierto={abierto} onClick={() => setAbierto(!abierto)} />

      {/* La lista solo existe mientras el menú está abierto. */}
      {abierto && (
        <ul className="menu-lista">
          {opciones.map((opcion) => (
            <li key={opcion.texto}>
              <button
                type="button"
                className="menu-opcion"
                onClick={() => {
                  setAbierto(false);
                  opcion.alElegir();
                }}
              >
                {opcion.texto}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MenuDesplegable;