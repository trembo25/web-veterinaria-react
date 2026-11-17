import { useState, type SubmitEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CampoFormulario from "../molecules/CampoFormulario";
import CorreoSimuladoContrasena from "../molecules/CorreoSimuladoContrasena";
import { useAuth } from "../../context/AuthContext";

// Código al azar de 6 dígitos, entre 100000 y 999999. Ej: "482913".
function crearCodigoContrasena() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function FormRestablecerContrasena() {
  // Paso 1: el correo de la cuenta.
  const [correo, setCorreo] = useState("");

  // El código que "enviamos". Mientras esté vacío, seguimos en el paso 1.
  const [codigoEnviado, setCodigoEnviado] = useState("");

  // Paso 2: lo que escribe el usuario.
  const [codigo, setCodigo] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const [error, setError] = useState("");

  // true mientras esperamos la respuesta del backend (evita doble envío).
  const [enviando, setEnviando] = useState(false);

  // Las dos funciones del contexto (ahora llaman al microservicio usuarios).
  const { revisarCorreoContrasena, restablecerContrasena } = useAuth();

  const navegar = useNavigate();

  // Página a la que quería ir antes del login (ej: "/agenda"), igual que en el registro.
  const ubicacion = useLocation();

  const estado = ubicacion.state as {
    from?: string;
  } | null;

  const destino = estado?.from;

  // true mientras no hayamos enviado el código.
  const enPasoCorreo = codigoEnviado === "";

  // "  Nacho@Gmail.com " → "nacho@gmail.com", igual que en el login.
  const correoLimpio = correo.trim().toLowerCase();

  // Paso 1: revisa el correo y "envía" el código.
  async function enviarCodigo() {
    if (correoLimpio === "") {
      setError("Debe ingresar su correo");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) {
      setError("Ingrese un correo válido");
      return;
    }

    // POST /usuarios/restablecer/verificar: responde 404 si no existe
    // y 403 si es la cuenta del administrador.
    try {
      await revisarCorreoContrasena(correoLimpio);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo revisar el correo");
      return;
    }

    // Al guardar el código, la página se vuelve a dibujar en el paso 2.
    setCodigoEnviado(crearCodigoContrasena());
  }

  // Paso 2: revisa el código y guarda la nueva contraseña.
  async function guardarContrasena() {
    if (codigo === "") {
      setError("Debe ingresar el código");
      return;
    }

    if (codigo !== codigoEnviado) {
      setError("El código no es correcto");
      return;
    }

    if (nuevaContrasena.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (nuevaContrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // PUT /usuarios/restablecer: el backend revisa que sea distinta
    // a la anterior (responde 400 si es igual) y la guarda cifrada.
    try {
      await restablecerContrasena(correoLimpio, nuevaContrasena);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cambiar la contraseña");
      return;
    }

    // Volvemos al login con el correo ya escrito y el aviso verde.
    navegar("/login", {
      state: {
        from: destino,
        correo: correoLimpio,
        contrasenaActualizada: true,
      },
      replace: true,
    });
  }

  const manejarEnvio = async (e: SubmitEvent<HTMLFormElement>) => {
    // Evitamos que el formulario recargue la página.
    e.preventDefault();

    // Limpiamos el error del intento anterior.
    setError("");
    setEnviando(true);

    try {
      if (enPasoCorreo) {
        await enviarCodigo();
      } else {
        await guardarContrasena();
      }
    } finally {
      setEnviando(false);
    }
  };

  // Vuelve al paso 1 para corregir el correo (el correo escrito se mantiene).
  function usarOtroCorreo() {
    setCodigoEnviado("");
    setCodigo("");
    setNuevaContrasena("");
    setConfirmarContrasena("");
    setError("");
  }

  return (
    <form onSubmit={manejarEnvio} noValidate>
      {enPasoCorreo ? (
        <>
          <p className="text-muted text-center">
            Escribe el correo de tu cuenta y te enviaremos un código.
          </p>

          <CampoFormulario
            etiqueta="Correo electrónico"
            tipo="email"
            nombre="correo"
            valor={correo}
            alCambiar={setCorreo}
          />
        </>
      ) : (
        <>
          <CorreoSimuladoContrasena correo={correoLimpio} codigo={codigoEnviado} />

          <CampoFormulario
            etiqueta="Código de 6 dígitos"
            tipo="text"
            nombre="codigo"
            valor={codigo}
            alCambiar={(texto) => setCodigo(texto.replace(/\D/g, "").slice(0, 6))}
            placeholder="123456"
            inputMode="numeric"
          />

          <CampoFormulario
            etiqueta="Nueva contraseña"
            tipo="password"
            nombre="nuevaContrasena"
            valor={nuevaContrasena}
            alCambiar={setNuevaContrasena}
          />

          <CampoFormulario
            etiqueta="Confirmar nueva contraseña"
            tipo="password"
            nombre="confirmarContrasena"
            valor={confirmarContrasena}
            alCambiar={setConfirmarContrasena}
          />
        </>
      )}

      {/* Mostramos este bloque solamente cuando existe un error. */}
      {error !== "" && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Mismo botón celeste del login. */}
      <button type="submit" className="boton-login" disabled={enviando}>
        {enviando ? "Procesando..." : enPasoCorreo ? "Enviar código" : "Guardar contraseña"}
      </button>

      {!enPasoCorreo && (
        <button
          type="button"
          className="btn btn-link w-100 mt-2"
          onClick={usarOtroCorreo}
        >
          Usar otro correo
        </button>
      )}

      <p className="mt-3 mb-0 text-center">
        ¿Recordaste tu contraseña?{" "}
        {/* text-nowrap: en el celular "Inicia sesión" baja completo, sin cortarse. */}
        <Link to="/login" state={{ from: destino }} className="text-nowrap">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}

export default FormRestablecerContrasena;