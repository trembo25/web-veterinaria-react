import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import FormLogin from "../components/organisms/FormLogin";
import FormRegistro from "../components/organisms/FormRegistro";
import { AuthProvider } from "../context/AuthContext";

// Token de ejemplo con exp muy lejano (año 2286), solo para las pruebas.
const datosToken = btoa(JSON.stringify({ sub: "ana@test.cl", rol: "cliente", exp: 9999999999 }));
const TOKEN = `cabecera.${datosToken}.firma`;

// Simula una respuesta del backend sin levantar los microservicios.
function respuestaJson(estado: number, cuerpo: unknown) {
  return Promise.resolve(
    new Response(JSON.stringify(cuerpo), {
      status: estado,
      headers: { "Content-Type": "application/json" },
    })
  );
}

function renderConAuth(componente: React.ReactNode) {
  return render(
    <MemoryRouter>
      <AuthProvider>{componente}</AuthProvider>
    </MemoryRouter>
  );
}

function escribir(nombreCampo: string, valor: string) {
  const campo = document.querySelector(`[name="${nombreCampo}"]`) as HTMLInputElement;
  fireEvent.change(campo, { target: { value: valor } });
}

describe("Login y registro conectados al backend", () => {
  beforeEach(() => {
    localStorage.clear();
    window.alert = vi.fn();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("el login llama a /auth/login y guarda la sesión con el token", async () => {
    const fetchSimulado = vi.spyOn(globalThis, "fetch").mockImplementation(() =>
      respuestaJson(200, { token: TOKEN, nombre: "Ana", email: "ana@test.cl", rol: "cliente", expiraEn: 3600 })
    );

    renderConAuth(<FormLogin />);
    escribir("correo", " Ana@Test.cl ");
    escribir("contrasena", "Cliente123");
    fireEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    await waitFor(() => expect(localStorage.getItem("sesion")).not.toBeNull());

    const [url, opciones] = fetchSimulado.mock.calls[0];
    expect(url).toBe("http://localhost:8086/auth/login");
    expect(JSON.parse(String(opciones?.body))).toEqual({ email: "ana@test.cl", password: "Cliente123" });
    expect(JSON.parse(localStorage.getItem("sesion")!).token).toBe(TOKEN);
  });

  it("el login muestra el mensaje del backend cuando responde 401", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() =>
      respuestaJson(401, { estado: 401, mensaje: "Correo o contraseña incorrectos" })
    );

    renderConAuth(<FormLogin />);
    escribir("correo", "ana@test.cl");
    escribir("contrasena", "Incorrecta1");
    fireEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    expect((await screen.findByRole("alert")).textContent).toBe("Correo o contraseña incorrectos");
    expect(localStorage.getItem("sesion")).toBeNull();
  });

  it("el registro muestra el error 409 cuando el correo ya existe", async () => {
    const fetchSimulado = vi.spyOn(globalThis, "fetch").mockImplementation(() =>
      respuestaJson(409, { estado: 409, mensaje: "Ese correo ya está registrado" })
    );

    renderConAuth(<FormRegistro />);
    escribir("nombre", "Ana");
    escribir("correo", "ana@test.cl");
    escribir("contrasena", "Cliente123");
    escribir("confirmarContrasena", "Cliente123");
    fireEvent.click(screen.getByRole("button", { name: "Crear cuenta" }));

    expect((await screen.findByRole("alert")).textContent).toBe("Ese correo ya está registrado");
    expect(fetchSimulado.mock.calls[0][0]).toBe("http://localhost:8081/usuarios/registro");
  });

  it("muestra un aviso si el backend está apagado", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("Failed to fetch"));

    renderConAuth(<FormLogin />);
    escribir("correo", "ana@test.cl");
    escribir("contrasena", "Cliente123");
    fireEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    expect((await screen.findByRole("alert")).textContent).toContain("No se pudo conectar con el servidor");
  });

  it("descarta una sesión guardada con el token vencido", () => {
    const vencido = `a.${btoa(JSON.stringify({ sub: "x@test.cl", rol: "cliente", exp: 1 }))}.b`;
    localStorage.setItem("sesion", JSON.stringify({ nombre: "X", email: "x@test.cl", rol: "cliente", token: vencido }));

    renderConAuth(<FormLogin />);

    expect(localStorage.getItem("sesion")).toBeNull();
  });
});
