import { useState, type SubmitEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CampoFormulario from "../molecules/CampoFormulario";
import { useAuth } from "../../context/AuthContext";

function FormLogin() {
  // Leemos los datos que llegan desde otra página.
  // Va antes de los estados porque el correo puede venir ya escrito.
  const ubicacion = useLocation();

  const estado = ubicacion.state as {
    from?: string;

    // Llegan al volver de "Restablecer contraseña".
    correo?: string;
    contrasenaActualizada?: boolean;
  } | null;

  const destino = estado?.from;

  // Guardamos los valores escritos en los campos.
  // Si viene un correo desde "Restablecer contraseña", aparece ya escrito.
  const [correo, setCorreo] = useState(estado?.correo ?? "");
  const [contrasena, setContrasena] = useState("");

  // Guardamos el mensaje de error que mostraremos en pantalla.
  const [error, setError] = useState("");

  // Obtenemos la función de inicio de sesión desde el contexto.
  const { login } = useAuth();

  // Permite cambiar de página desde el código.
  const navegar = useNavigate();

  const manejarEnvio = (e: SubmitEvent<HTMLFormElement>) => {
    // Evitamos que el formulario recargue la página.
    e.preventDefault();

    // Limpiamos el error del intento anterior.
    setError("");

    if (correo.trim() === "") {
      setError("Debe ingresar su correo");
      return;
    }

    // Comprobamos que el correo tenga un formato válido.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      setError("Ingrese un correo válido");
      return;
    }

    if (contrasena === "") {
      setError("Debe ingresar su contraseña");
      return;
    }

    // El contexto comprueba las credenciales y guarda la sesión.
    const sesion = login(correo, contrasena);

    // Si no hay coincidencia, detenemos el proceso.
    if (!sesion) {
      setError("Correo o contraseña incorrectos");
      return;
    }

    // Al presionar Aceptar, continúa la redirección.
    alert(`¡Ingreso exitoso! Bienvenido/a, ${sesion.nombre}.`);

    // El administrador se dirige a su panel.
    if (sesion.rol === "admin") {
      navegar("/admin", { replace: true });
      return;
    }

    // El cliente vuelve al inicio de la página informativa.
    navegar(destino ?? "/", { replace: true });
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      {/* Aviso verde al volver de "Restablecer contraseña".
          Se oculta si aparece un error, para no mostrar dos avisos juntos. */}
      {estado?.contrasenaActualizada && error === "" && (
        <div className="alert alert-success" role="status">
          Contraseña actualizada. Inicia sesión con tu nueva contraseña.
        </div>
      )}

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

      {/* Enlace bajo la contraseña, a la derecha (estilo en App.css, sección 7.1).
          Conserva la página a la que quería ir, igual que "Regístrate". */}
      <Link
        to="/restablecer-contrasena"
        state={{ from: destino }}
        className="enlace-olvide-contrasena"
      >
        ¿Olvidaste tu contraseña?
      </Link>

      {/* Mostramos este bloque solamente cuando existe un error. */}
      {error !== "" && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    {/* Botón con un estilo exclusivo para el login. */}
    <button
      type="submit"
      className="boton-login"
    >
      Iniciar sesión
    </button>

      <p className="mt-3 mb-0 text-center">
        ¿No tienes cuenta?{" "}
        <Link to="/registro" state={{ from: destino }}
        >
          Regístrate
        </Link>
      </p>
    </form>
  );
}

export default FormLogin;