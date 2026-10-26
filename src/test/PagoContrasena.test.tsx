import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import InsigniaPago from "../components/atoms/InsigniaPago";
import ComprobantePago from "../components/organisms/ComprobantePago";
import FormPago from "../components/organisms/FormPago";
import CorreoSimuladoContrasena from "../components/molecules/CorreoSimuladoContrasena";
import type { Pago } from "../types";

// Pago ficticio utilizado únicamente en las pruebas.
const pagoEjemplo: Pago = {
  codigo: "VSM-123456",
  metodo: "tarjeta",
  monto: "$45.000",
  fecha: "2026-10-23T12:30:00.000Z",
  estado: "pagado",
  ultimos4: "4242",
};

describe("Pruebas de Pago y Restablecer contraseña", () => {
  // Después de cada prueba limpiamos la pantalla.
  afterEach(() => {
    cleanup();
  });

  // PRUEBA 1: etiqueta de una cita pagada.
  it("muestra la etiqueta Pagada", () => {
    render(<InsigniaPago estado="pagado" />);

    expect(screen.getByText("Pagada").textContent).toBe("Pagada");
  });

  // PRUEBA 2: etiqueta de una transferencia sin confirmar.
  it("muestra la etiqueta Pago pendiente", () => {
    render(<InsigniaPago estado="pendiente" />);

    expect(screen.getByText("Pago pendiente").textContent).toBe("Pago pendiente");
  });

  // PRUEBA 3: mensaje del comprobante.
  it("muestra el mensaje de pago exitoso en el comprobante", () => {
    render(<ComprobantePago pago={pagoEjemplo} />);

    expect(
      screen.getByText("¡Pago realizado con éxito!").textContent
    ).toBe("¡Pago realizado con éxito!");
  });

  // PRUEBA 4: botón para pagar con el monto.
  it("muestra el botón Pagar con el monto", () => {
    // alPagar no hace nada: esta prueba solo mira el botón.
    render(<FormPago monto="$45.000" alPagar={() => {}} />);

    const boton = screen.getByRole("button", { name: "Pagar $45.000" });

    expect(boton.textContent).toBe("Pagar $45.000");
  });

  // PRUEBA 5: código para restablecer la contraseña.
  it("muestra el código en el correo para restablecer la contraseña", () => {
    render(
      <CorreoSimuladoContrasena correo="nacho@correo.cl" codigo="482913" />
    );

    expect(screen.getByText("482913").textContent).toBe("482913");
  });
});