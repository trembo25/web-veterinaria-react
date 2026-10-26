import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import CampoFormulario from "../molecules/CampoFormulario";
import CampoSelect from "../molecules/CampoSelect";
import Boton from "../atoms/Boton";

import { useAuth } from "../../context/AuthContext";
import { obtenerServicios } from "../../data/servicios";
import { obtenerCitas, guardarCitas } from "../../data/Citas";
import type { Cita } from "../../types";

const horas = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
];

// Convierte una fecha al texto "AAAA-MM-DD" que usa el calendario,
// con la hora del computador. Ej: 21 de octubre de 2026 → "2026-10-21".
function aTextoFecha(fecha: Date) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

function FormAgendar() {
  const [mascota, setMascota] = useState("");
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [error, setError] = useState("");

  const { usuario } = useAuth();
  const navegar = useNavigate();

  const nombresServicios = obtenerServicios().map((actual) => actual.titulo);

  // ---------- Límites del calendario ----------
  const ahora = new Date();
  const hoy = aTextoFecha(ahora); // ej: "2026-10-21"
  const horaActual = ahora.toTimeString().slice(0, 5); // ej: "19:41"

  // Horas que todavía quedan hoy (las que vienen después de la hora actual).
  const horasDeHoy = horas.filter((h) => h > horaActual);

  // Si hoy ya no quedan horas, el primer día que se puede elegir es mañana.
  const manana = new Date(ahora);
  manana.setDate(ahora.getDate() + 1);
  const fechaMinima = horasDeHoy.length > 0 ? hoy : aTextoFecha(manana);

  // Se puede agendar hasta 3 meses desde hoy.
  const limite = new Date(ahora);
  limite.setMonth(ahora.getMonth() + 3);
  const fechaMaxima = aTextoFecha(limite);

  // Horas que muestra la lista: si el día elegido es hoy, solo las que quedan.
  function horasDelDia(dia: string) {
    return dia === hoy ? horasDeHoy : horas;
  }

  // Al cambiar la fecha, borramos la hora solo si ese día ya no está disponible.
  function cambiarFecha(nuevaFecha: string) {
    setFecha(nuevaFecha);

    if (!horasDelDia(nuevaFecha).includes(hora)) {
      setHora("");
    }
  }

  const manejarEnvio = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (usuario === null) {
      setError("Debe iniciar sesión para agendar una cita");
      return;
    }

    if (mascota.trim() === "") {
      setError("Debe ingresar el nombre de la mascota");
      return;
    }

    if (servicio === "") {
      setError("Debe seleccionar un servicio");
      return;
    }

    if (fecha === "") {
      setError("Debe seleccionar una fecha");
      return;
    }

    // Por si escriben a mano una fecha fuera de lo que permite el calendario.
    if (fecha < fechaMinima) {
      setError("Esa fecha ya no está disponible");
      return;
    }

    if (fecha > fechaMaxima) {
      setError("Solo se puede agendar hasta 3 meses adelante");
      return;
    }

    if (hora === "") {
      setError("Debe seleccionar una hora");
      return;
    }

    const fechaHora = `${fecha}T${hora}`;
    const fechaElegida = new Date(fechaHora);
    const diaSemana = fechaElegida.getDay();

    if (diaSemana === 0 || diaSemana === 6) {
      setError("Solo se pueden agendar citas de lunes a viernes");
      return;
    }

    if (fechaElegida < new Date()) {
      setError("La fecha y la hora elegidas ya pasaron");
      return;
    }

    const nuevaCita: Cita = {
      id: Date.now(),
      clienteEmail: usuario.email,
      clienteNombre: usuario.nombre,
      mascota: mascota.trim(),
      servicio,
      fecha: fechaHora,
    };

    guardarCitas([...obtenerCitas(), nuevaCita]);

    alert("Cita agendada correctamente.");

    navegar("/", { replace: true });
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <CampoFormulario
        etiqueta="Nombre de la mascota"
        tipo="text"
        nombre="mascota"
        valor={mascota}
        alCambiar={setMascota}
      />

      <CampoSelect
        etiqueta="Servicio"
        nombre="servicio"
        valor={servicio}
        alCambiar={setServicio}
        opciones={nombresServicios}
        textoInicial="Selecciona un servicio"
      />

      {/* min y max dejan en gris los días que no se pueden elegir. */}
      <CampoFormulario
        etiqueta="Fecha"
        tipo="date"
        nombre="fecha"
        valor={fecha}
        alCambiar={cambiarFecha}
        min={fechaMinima}
        max={fechaMaxima}
      />

      <CampoSelect
        etiqueta="Hora"
        nombre="hora"
        valor={hora}
        alCambiar={setHora}
        opciones={horasDelDia(fecha)}
        textoInicial="Selecciona una hora"
      />

      {error !== "" && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="d-grid">
        <Boton texto="Solicitar cita" type="submit" variante="color" />
      </div>
    </form>
  );
}

export default FormAgendar;