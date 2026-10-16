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

function FormAgendar() {
  const [mascota, setMascota] = useState("");
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [error, setError] = useState("");

  const { usuario } = useAuth();
  const navegar = useNavigate();

  const nombresServicios = obtenerServicios().map((actual) => actual.titulo);

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

      <CampoFormulario
        etiqueta="Fecha"
        tipo="date"
        nombre="fecha"
        valor={fecha}
        alCambiar={setFecha}
      />

      <CampoSelect
        etiqueta="Hora"
        nombre="hora"
        valor={hora}
        alCambiar={setHora}
        opciones={horas}
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