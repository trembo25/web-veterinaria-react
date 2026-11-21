import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
} from "vitest";

import {
  render,
  screen,
  cleanup,
} from "@testing-library/react";

import TablaCitas from "../components/organisms/TablaCitas";

// Cita ficticia utilizada únicamente en las pruebas.
const citaEjemplo = {
  id: 1,
  clienteNombre: "Cristhian",
  clienteEmail: "cristhian@ejemplo.cl",
  mascota: "Zeus",
  servicio: "Consulta Veterinaria",
  fecha: "2026-12-11T20:00",
};

// Simula la respuesta del microservicio de citas.
// Así las pruebas no dependen de que el backend esté encendido.
function simularCitas(citas: unknown[]) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => citas,
    })
  );
}

describe("Pruebas de TablaCitas", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Después de cada prueba limpiamos el entorno y quitamos el fetch simulado.
  afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  // PRUEBA 1: mostrar el título.
  it("muestra el título Citas de los clientes", () => {
    simularCitas([]);
    render(<TablaCitas />);

    const titulo = screen.getByRole("heading", {
      name: "Citas de los clientes",
    });

    expect(titulo.textContent).toBe("Citas de los clientes");
  });

  // PRUEBA 2: mostrar el mensaje cuando no hay citas.
  it("muestra un mensaje cuando no hay citas registradas", async () => {
    simularCitas([]);
    render(<TablaCitas />);

    // findBy espera a que llegue la respuesta del fetch.
    const mensaje = await screen.findByText(
      "Todavía no hay citas registradas."
    );

    expect(mensaje.textContent).toBe("Todavía no hay citas registradas.");
    expect(screen.queryByRole("table")).toBeNull();
  });

  // PRUEBA 3: mostrar los datos de una cita.
  it("muestra los datos de una cita guardada", async () => {
    simularCitas([citaEjemplo]);
    render(<TablaCitas />);

    expect((await screen.findByText("Cristhian")).textContent).toBe("Cristhian");
    expect(screen.getByText("Zeus").textContent).toBe("Zeus");
    expect(screen.getByText("Consulta Veterinaria").textContent).toBe(
      "Consulta Veterinaria"
    );
  });

  // PRUEBA 4: mostrar los cinco encabezados.
  it("muestra los cinco encabezados de la tabla", async () => {
    simularCitas([citaEjemplo]);
    render(<TablaCitas />);

    await screen.findByRole("table");
    const encabezados = screen.getAllByRole("columnheader");

    expect(encabezados.length).toBe(5);
    expect(encabezados[0].textContent).toBe("Cliente");
    expect(encabezados[1].textContent).toBe("Mascota");
    expect(encabezados[2].textContent).toBe("Servicio");
    expect(encabezados[3].textContent).toBe("Fecha y hora");
    expect(encabezados[4].textContent).toBe("Acciones");
  });

  // PRUEBA 5: mostrar el botón de eliminar.
  it("muestra el botón Eliminar cuando existe una cita", async () => {
    simularCitas([citaEjemplo]);
    render(<TablaCitas />);

    const boton = await screen.findByRole("button", { name: "Eliminar" });

    expect(boton.textContent).toBe("Eliminar");
  });

  // PRUEBA 6: la tabla usa el método responsive de Bootstrap.
  it("usa una tabla responsive que se adapta a celular, tablet y pc", async () => {
    simularCitas([citaEjemplo]);
    const { container } = render(<TablaCitas />);

    await screen.findByRole("table");

    const contenedor = container.querySelector(".table-responsive");
    expect(contenedor).not.toBeNull();

    const tabla = contenedor?.querySelector("table");
    expect(tabla).not.toBeNull();
    expect(tabla?.classList.contains("table")).toBe(true);
  });
});