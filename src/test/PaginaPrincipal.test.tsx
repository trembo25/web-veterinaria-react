import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { AuthProvider } from "../context/AuthContext";

function renderApp() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("Pruebas de la Página Principal", () => {
  beforeEach(() => {
    localStorage.clear();
    // jsdom no implementa estas funciones y ManejoScroll las puede usar.
    window.scrollTo = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();

    // Simula al microservicio de servicios con un servicio de ejemplo,
    // para que las pruebas no dependan de que el backend esté encendido.
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          {
            id: 1,
            titulo: "Consulta Veterinaria",
            descripcion: "Consulta de ejemplo",
            imagen: "/images/atencion.jpeg",
            precio: "$23.000",
          },
        ],
      })
    );
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it("muestra 'Inicio' en el header", () => {
    renderApp();
    expect(
      screen.getAllByRole("link", { name: /^inicio$/i }).length
    ).toBeGreaterThan(0);
  });

  it("muestra 'Servicios' en el header", () => {
    renderApp();
    expect(
      screen.getAllByRole("link", { name: /servicios/i }).length
    ).toBeGreaterThan(0);
  });

  it("muestra 'Nosotros' en el header", () => {
    renderApp();
    expect(
      screen.getAllByRole("link", { name: /nosotros/i }).length
    ).toBeGreaterThan(0);
  });

  it("muestra el botón 'Ingresar'", () => {
    renderApp();
    const ingresar =
      screen.queryByRole("button", { name: /ingresar/i }) ??
      screen.queryByRole("link", { name: /ingresar/i });
    expect(ingresar).not.toBeNull();
  });

  it("muestra al menos un 'Ver Detalles'", async () => {
    renderApp();

    // Espera a que lleguen los servicios del fetch simulado.
    await screen.findAllByText(/ver detalles/i);

    const items = [
      ...screen.queryAllByRole("button", { name: /ver detalles/i }),
      ...screen.queryAllByRole("link", { name: /ver detalles/i }),
    ];
    expect(items.length).toBeGreaterThan(0);
  });
});