import { useState, type FormEvent } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import CampoFormulario from "../molecules/CampoFormulario";
import { useAuth } from "../../context/AuthContext";

function FormRegistro() {
  // Estados que guardan los datos escritos en el formulario.
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  // Mensaje que mostraremos si ocurre un error.
  const [error, setError] = useState("");

  // Obtenemos la función de registro desde el contexto.
  const { registrar } = useAuth();

  // Permite cambiar de página después del registro.
  const navegar = useNavigate();

  // Recuperamos el destino que venía desde el login.
  const ubicacion = useLocation();

  const estado = ubicacion.state as {
    from?: string;
  } | null;

  const destino = estado?.from;

  const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
    // Evitamos que el formulario recargue la página.
    e.preventDefault();

    // Limpiamos cualquier error del intento anterior.
    setError("");

    // Validamos los campos antes de intentar registrar.
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

    if (contrasena.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (contrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // El contexto revisa si el correo está ocupado y guarda la cuenta.
    // Devuelve un mensaje de error o null cuando todo sale bien.
    const mensaje = registrar(nombre, correo, contrasena);

    if (mensaje !== null) {
      setError(mensaje);
      return;
    }

    alert("Cuenta creada correctamente. Ahora puedes iniciar sesión.");

    // El registro no inicia sesión automáticamente.
    // Volvemos al login conservando el destino original.
    navegar("/login", {
      state: { from: destino },
      replace: true,
    });
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

      <CampoFormulario
        etiqueta="Contraseña"
        tipo="password"
        nombre="contrasena"
        valor={contrasena}
        alCambiar={setContrasena}
      />

      <CampoFormulario
        etiqueta="Confirmar contraseña"
        tipo="password"
        nombre="confirmarContrasena"
        valor={confirmarContrasena}
        alCambiar={setConfirmarContrasena}
      />

      {/* Este mensaje aparece solo si hay un error. */}
      {error !== "" && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-100"
      >
        Crear cuenta
      </button>

      <p className="mt-3 mb-0 text-center">
        ¿Ya tienes una cuenta?{" "}
        <Link
          to="/login"
          state={{ from: destino }}
        >
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}

export default FormRegistro;