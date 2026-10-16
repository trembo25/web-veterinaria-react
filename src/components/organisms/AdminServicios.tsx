import { useState, type SubmitEvent } from "react";

import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";

import type { Servicio } from "../../types";

import {
  obtenerServicios,
  guardarServicios,
} from "../../data/servicios";

// Todos los servicios nuevos utilizarán esta imagen.
// Reutilizamos una imagen que ya existe en el proyecto.
import imagenPredeterminada from "../../assets/images/atencion.jpeg";

function AdminServicios() {
  // Lista de servicios que mostramos en el panel.
  const [servicios, setServicios] = useState<Servicio[]>(
    obtenerServicios
  );

  // El formulario ahora solo tiene dos campos.
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // null significa que estamos creando un servicio.
  // Un id significa que estamos editando ese servicio.
  const [editandoId, setEditandoId] = useState<number | null>(
    null
  );

  const [error, setError] = useState("");

  function limpiarFormulario() {
    setTitulo("");
    setDescripcion("");
    setEditandoId(null);
    setError("");
  }

  // Guardamos los cambios y después actualizamos la pantalla.
  function actualizarLista(lista: Servicio[]): boolean {
    try {
      guardarServicios(lista);
      setServicios(lista);
      return true;
    } catch {
      setError("No se pudieron guardar los cambios");
      return false;
    }
  }

  function manejarEnvio(e: SubmitEvent<HTMLFormElement>) {
    // Evitamos la recarga de la página.
    e.preventDefault();
    setError("");

    if (titulo.trim() === "") {
      setError("Debe ingresar el título del servicio");
      return;
    }

    if (descripcion.trim() === "") {
      setError("Debe ingresar una descripción");
      return;
    }

    // Datos que podemos crear o modificar desde el formulario.
    const datos = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
    };

    let listaActualizada: Servicio[];

    if (editandoId === null) {
      // CREAR:
      // Asignamos la imagen predeterminada automáticamente.
      const nuevoServicio: Servicio = {
        id: Date.now(),
        ...datos,
        imagen: imagenPredeterminada,
      };

      listaActualizada = [...servicios, nuevoServicio];
    } else {
      // EDITAR:
      // Conservamos el id y la imagen del servicio original.
      // Solo reemplazamos el título y la descripción.
      listaActualizada = servicios.map((servicio) =>
        servicio.id === editandoId
          ? { ...servicio, ...datos }
          : servicio
      );
    }

    // Limpiamos el formulario únicamente si se guardó correctamente.
    if (actualizarLista(listaActualizada)) {
      limpiarFormulario();
    }
  }

  function editarServicio(servicio: Servicio) {
    // Cargamos únicamente los campos que se pueden editar.
    setEditandoId(servicio.id);
    setTitulo(servicio.titulo);
    setDescripcion(servicio.descripcion);
    setError("");
  }

  function eliminarServicio(servicio: Servicio) {
    const confirmar = window.confirm(
      `¿Eliminar el servicio "${servicio.titulo}"?`
    );

    if (!confirmar) {
      return;
    }

    // Creamos una lista sin el servicio seleccionado.
    const listaActualizada = servicios.filter(
      (actual) => actual.id !== servicio.id
    );

    const guardado = actualizarLista(listaActualizada);

    // Si eliminamos el servicio que estaba en edición,
    // también limpiamos el formulario.
    if (guardado && editandoId === servicio.id) {
      limpiarFormulario();
    }
  }

  return (
    <section className="admin-seccion">
      <h2 className="admin-titulo-seccion">
        Gestión de servicios
      </h2>

      <form
        className="admin-formulario"
        onSubmit={manejarEnvio}
        noValidate
      >
        <h3>
          {editandoId === null
            ? "Crear servicio"
            : "Editar servicio"}
        </h3>

        <CampoFormulario
          etiqueta="Título"
          tipo="text"
          nombre="tituloServicio"
          valor={titulo}
          alCambiar={setTitulo}
        />

        <CampoFormulario
          etiqueta="Descripción"
          tipo="text"
          nombre="descripcionServicio"
          valor={descripcion}
          alCambiar={setDescripcion}
        />

        <p className="admin-descripcion">
          {editandoId === null
            ? "El servicio nuevo tendrá una imagen predeterminada."
            : "Se conservará la imagen actual del servicio."}
        </p>

        {error !== "" && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="admin-acciones">
          <Boton
            texto={
              editandoId === null
                ? "Crear servicio"
                : "Guardar cambios"
            }
            type="submit"
            variante="color"
          />

          {editandoId !== null && (
            <Boton
              texto="Cancelar edición"
              variante="transparente"
              onClick={limpiarFormulario}
            />
          )}
        </div>
      </form>

      <h3 className="admin-subtitulo">
        Servicios registrados: {servicios.length}
      </h3>

      {servicios.length === 0 ? (
        <p className="admin-vacio">
          No hay servicios registrados.
        </p>
      ) : (
        <div className="admin-lista-servicios">
          {servicios.map((servicio) => (
            <article
              key={servicio.id}
              className="admin-servicio"
            >
              <img
                src={servicio.imagen}
                alt={servicio.titulo}
                className="admin-servicio-imagen"
              />

              <div className="admin-servicio-info">
                <h4>{servicio.titulo}</h4>
                <p>{servicio.descripcion}</p>
              </div>

              <div className="admin-acciones">
                <Boton
                  texto="Editar"
                  variante="transparente"
                  onClick={() => editarServicio(servicio)}
                />

                <Boton
                  texto="Eliminar"
                  variante="transparente"
                  onClick={() => eliminarServicio(servicio)}
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminServicios;