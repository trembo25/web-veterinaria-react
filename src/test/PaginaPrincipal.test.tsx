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
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
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

  it("muestra al menos un 'Ver Detalles'", () => {
    renderApp();
    const items = [
      ...screen.queryAllByRole("button", { name: /ver detalles/i }),
      ...screen.queryAllByRole("link", { name: /ver detalles/i }),
    ];
    expect(items.length).toBeGreaterThan(0);
  });
});