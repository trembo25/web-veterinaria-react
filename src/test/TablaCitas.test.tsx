import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "vitest";

import {
  render,
  screen,
  cleanup,
} from "@testing-library/react";

import TablaCitas from "../components/organisms/TablaCitas";

// Cita ficticia utilizada únicamente en las pruebas.
const citaEjemplo = {
  id: "1",
  clienteNombre: "Cristhian",
  clienteEmail: "cristhian@ejemplo.cl",
  mascota: "Zeus",
  servicio: "Consulta Veterinaria",
  fecha: "2026-12-11T20:00:00",
};

describe("Pruebas de TablaCitas", () => {
  // Antes de cada prueba dejamos el almacenamiento vacío.
  beforeEach(() => {
    localStorage.clear();
  });

  // Después de cada prueba limpiamos el entorno.
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  // PRUEBA 1: mostrar el título.
  it("muestra el título Citas de los clientes", () => {
    render(<TablaCitas />);

    const titulo = screen.getByRole("heading", {
      name: "Citas de los clientes",
    });

    expect(titulo.textContent).toBe("Citas de los clientes");
  });

  // PRUEBA 2: mostrar el mensaje cuando no hay citas.
  it("muestra un mensaje cuando no hay citas registradas", () => {
    render(<TablaCitas />);

    const mensaje = screen.getByText(
      "Todavía no hay citas registradas."
    );

    expect(mensaje.textContent).toBe(
      "Todavía no hay citas registradas."
    );

    expect(screen.queryByRole("table")).toBeNull();
  });

  // PRUEBA 3: mostrar los datos de una cita.
  it("muestra los datos de una cita guardada", () => {
    localStorage.setItem(
      "citas",
      JSON.stringify([citaEjemplo])
    );

    render(<TablaCitas />);

    expect(
      screen.getByText("Cristhian").textContent
    ).toBe("Cristhian");

    expect(
      screen.getByText("Zeus").textContent
    ).toBe("Zeus");

    expect(
      screen.getByText("Consulta Veterinaria").textContent
    ).toBe("Consulta Veterinaria");
  });

  // PRUEBA 4: mostrar los cinco encabezados.
  it("muestra los cinco encabezados de la tabla", () => {
    localStorage.setItem(
      "citas",
      JSON.stringify([citaEjemplo])
    );

    render(<TablaCitas />);

    const encabezados = screen.getAllByRole("columnheader");

    expect(encabezados.length).toBe(5);

    expect(encabezados[0].textContent).toBe("Cliente");
    expect(encabezados[1].textContent).toBe("Mascota");
    expect(encabezados[2].textContent).toBe("Servicio");
    expect(encabezados[3].textContent).toBe("Fecha y hora");
    expect(encabezados[4].textContent).toBe("Acciones");
  });

  // PRUEBA 5: mostrar el botón de eliminar.
  it("muestra el botón Eliminar cuando existe una cita", () => {
    localStorage.setItem(
      "citas",
      JSON.stringify([citaEjemplo])
    );

    render(<TablaCitas />);

    const boton = screen.getByRole("button", {
      name: "Eliminar",
    });

    expect(boton.textContent).toBe("Eliminar");
  });

  // PRUEBA 6: la tabla usa el método responsive de Bootstrap.
  it("usa una tabla responsive que se adapta a celular, tablet y pc", () => {
    localStorage.setItem(
      "citas",
      JSON.stringify([citaEjemplo])
    );

    const { container } = render(<TablaCitas />);

    // La tabla debe estar dentro de un contenedor .table-responsive.
    const contenedor = container.querySelector(".table-responsive");

    expect(contenedor).not.toBeNull();

    // Y la tabla realmente debe estar dentro de ese contenedor.
    const tabla = contenedor?.querySelector("table");

    expect(tabla).not.toBeNull();
    expect(tabla?.classList.contains("table")).toBe(true);
  });
});