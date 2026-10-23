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

import { MemoryRouter } from "react-router-dom";
import App from "../App"; // O importa tu componente de Página Principal (ej: Home)

describe("Pruebas de la Página Principal", () => {
  // Antes de cada prueba dejamos el almacenamiento vacío.
  beforeEach(() => {
    localStorage.clear();
  });

  // Después de cada prueba limpiamos el entorno.
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  // PRUEBA 1: Verificar el botón "Inicio" en el Header
  it("muestra el botón o enlace 'Inicio' en el header", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const botonInicio = screen.getByRole("link", { name: /inicio/i });
    expect(botonInicio).toBeDefined();
  });

  // PRUEBA 2: Verificar el botón "Servicios" en el Header
  it("muestra el botón o enlace 'Servicios' en el header", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const botonServicios = screen.getByRole("link", { name: /servicios/i });
    expect(botonServicios).toBeDefined();
  });

  // PRUEBA 3: Verificar el botón "Nosotros" en el Header
  it("muestra el botón o enlace 'Nosotros' en el header", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const botonNosotros = screen.getByRole("link", { name: /nosotros/i });
    expect(botonNosotros).toBeDefined();
  });

  // PRUEBA 4: Verificar el botón de inicio de sesión ("Ingresar")
  it("muestra el botón de inicio de sesión 'Ingresar'", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const botonIngresar = screen.getByRole("button", { name: /ingresar/i }) || 
                          screen.getByRole("link", { name: /ingresar/i });

    expect(botonIngresar).toBeDefined();
  });

  // PRUEBA 5: Verificar que existen los botones "Ver Detalles" en las cards de servicios
  it("muestra al menos un botón 'Ver Detalles' en las tarjetas de productos/servicios", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const botonesDetalles = screen.getAllByRole("button", { name: /ver detalles/i });

    // Verificamos que al menos exista un botón "Ver Detalles" renderizado en la página
    expect(botonesDetalles.length).toBeGreaterThan(0);
  });
});