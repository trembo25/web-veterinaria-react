import { useState, type SubmitEvent } from "react";

import CampoFormulario from "../molecules/CampoFormulario";
import CampoAreaTexto from "../molecules/CampoAreaTexto";
import Boton from "../atoms/Boton";

import { useAuth } from "../../context/AuthContext";
import { enviarMensaje } from "../../data/mensajes";

function FormContacto() {
  const { usuario } = useAuth();

  // Si hay sesión, el nombre y el correo parten rellenados.
  const [nombre, setNombre] = useState(usuario?.nombre ?? "");
  const [correo, setCorreo] = useState(usuario?.email ?? "");
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const manejarEnvio = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Evita enviar dos veces si se hace clic varias veces seguidas.
    if (enviando) {
      return;
    }

    if (nombre.trim() === "") {
      setError("Debe ingresar su nombre");
      return;
    }

    if (correo.trim() === "") {
      setError("Debe ingresar su correo");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      setError("Ingrese un correo válido");
      return;
    }

    if (texto.trim() === "") {
      setError("Debe escribir un mensaje");
      return;
    }

    setEnviando(true);

    try {
      await enviarMensaje({
        nombre: nombre.trim(),
        correo: correo.trim(),
        texto: texto.trim(),
      });

      alert("¡Gracias por escribirnos! Te responderemos a la brevedad.");

      // Volvemos al inicio: datos de la sesión (si hay) y mensaje vacío.
      setNombre(usuario?.nombre ?? "");
      setCorreo(usuario?.email ?? "");
      setTexto("");
    } catch (err) {
      // Si el servidor respondió con un error mostramos su mensaje.
      // Si ni siquiera hubo respuesta, el microservicio está apagado o inaccesible.
      setError(
        err instanceof TypeError
          ? "No se pudo conectar con el servidor. Intente más tarde."
          : err instanceof Error
            ? err.message
            : "No se pudo enviar el mensaje"
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <CampoFormulario
        etiqueta="Nombre completo"
        tipo="text"
        nombre="nombre"
        valor={nombre}
        alCambiar={setNombre}
      />

      <CampoFormulario
        etiqueta="Correo electrónico"
        tipo="email"
        nombre="correo"
        valor={correo}
        alCambiar={setCorreo}
      />

      <CampoAreaTexto
        etiqueta="Mensaje"
        nombre="mensaje"
        valor={texto}
        alCambiar={setTexto}
      />

      {error !== "" && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="d-grid">
        <Boton
          texto={enviando ? "Enviando..." : "Enviar mensaje"}
          type="submit"
          variante="color"
        />
      </div>
    </form>
  );
}

export default FormContacto;
