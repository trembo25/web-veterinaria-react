import { useState, type SubmitEvent } from "react";

import CampoFormulario from "../molecules/CampoFormulario";
import OpcionPago from "../molecules/OpcionPago";
import DatosTransferenciaPago from "../molecules/DatosTransferenciaPago";
import Boton from "../atoms/Boton";

import type { Pago } from "../../types";

type Props = {
  // Lo que se cobra, ej: "$45.000".
  monto: string;

  // La página recibe el pago y lo guarda.
  alPagar: (pago: Pago) => void;
};

// ---------- Funciones de apoyo (no usan estado) ----------

// Deja solo números (máximo 16) en grupos de 4.
// Ej: "1234567891234566" → "1234 5678 9123 4566".
function formatearNumero(texto: string) {
  const digitos = texto.replace(/\D/g, "").slice(0, 16);

  return digitos.match(/.{1,4}/g)?.join(" ") ?? "";
}

// Agrega la barra después del mes. Ej: "1228" → "12/28".
function formatearVencimiento(texto: string) {
  const digitos = texto.replace(/\D/g, "").slice(0, 4);

  return digitos.length > 2
    ? `${digitos.slice(0, 2)}/${digitos.slice(2)}`
    : digitos;
}

// Código del comprobante con los últimos 6 dígitos de la hora actual.
// Ej: "VSM-482913" (VSM = Veterinaria San Marcos).
function crearCodigo() {
  return `VSM-${String(Date.now()).slice(-6)}`;
}

function FormPago({ monto, alPagar }: Props) {
  const [metodo, setMetodo] = useState<Pago["metodo"]>("tarjeta");
  const [numero, setNumero] = useState("");
  const [nombre, setNombre] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  // Al cambiar de método borramos el error anterior.
  function elegirMetodo(nuevo: Pago["metodo"]) {
    setMetodo(nuevo);
    setError("");
  }

  // Revisa la tarjeta. Devuelve el mensaje de error, o "" si todo está bien.
  function revisarTarjeta() {
    // "1234 5678 9123 4566" → "1234567891234566".
    const digitos = numero.replace(/\s/g, "");

    // Pago simulado: sirve cualquier número de 16 dígitos
    // (no revisamos si la tarjeta existe de verdad).
    if (digitos.length !== 16) {
      return "El número de la tarjeta debe tener 16 dígitos";
    }

    if (nombre.trim() === "") {
      return "Debe ingresar el nombre que aparece en la tarjeta";
    }

    // Exactamente 2 números, una barra y 2 números.
    if (!/^\d{2}\/\d{2}$/.test(vencimiento)) {
      return "El vencimiento debe tener el formato MM/AA";
    }

    // "12/28" → mes 12, año 28.
    const mes = Number(vencimiento.slice(0, 2));
    const anio = Number(vencimiento.slice(3));

    if (mes < 1 || mes > 12) {
      return "El mes de vencimiento no es válido";
    }

    const hoy = new Date();
    const anioActual = hoy.getFullYear() % 100; // 2026 → 26
    const mesActual = hoy.getMonth() + 1; // octubre → 10

    // La tarjeta sirve hasta el último día de su mes de vencimiento.
    if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
      return "La tarjeta está vencida";
    }

    if (!/^\d{3}$/.test(cvv)) {
      return "El CVV debe tener 3 dígitos";
    }

    return "";
  }

  const manejarEnvio = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (metodo === "tarjeta") {
      const problema = revisarTarjeta();

      if (problema !== "") {
        setError(problema);
        return;
      }

      alPagar({
        codigo: crearCodigo(),
        metodo: "tarjeta",
        monto,
        fecha: new Date().toISOString(),
        estado: "pagado",

        // Solo los últimos 4: "1234 5678 9123 4566" → "4566".
        // Nunca guardamos el número completo ni el CVV.
        ultimos4: numero.slice(-4),
      });

      return;
    }

    // Transferencia: queda pendiente hasta que el admin la confirme.
    alPagar({
      codigo: crearCodigo(),
      metodo: "transferencia",
      monto,
      fecha: new Date().toISOString(),
      estado: "pendiente",
    });
  };

  return (
    // autoComplete="off": que el navegador no ofrezca rellenar con una tarjeta real.
    <form onSubmit={manejarEnvio} noValidate autoComplete="off">
      <fieldset className="mb-3 text-start">
        <legend className="form-label fs-6">Método de pago</legend>

        <OpcionPago
          grupo="metodo"
          valor="tarjeta"
          texto="Tarjeta de crédito o débito"
          seleccionado={metodo === "tarjeta"}
          alElegir={() => elegirMetodo("tarjeta")}
        />

        <OpcionPago
          grupo="metodo"
          valor="transferencia"
          texto="Transferencia bancaria"
          seleccionado={metodo === "transferencia"}
          alElegir={() => elegirMetodo("transferencia")}
        />
      </fieldset>

      {metodo === "tarjeta" ? (
        <>
          <CampoFormulario
            etiqueta="Número de la tarjeta"
            tipo="text"
            nombre="numeroTarjeta"
            valor={numero}
            alCambiar={(texto) => setNumero(formatearNumero(texto))}
            placeholder="1234 5678 9012 3456"
            inputMode="numeric"
          />

          <CampoFormulario
            etiqueta="Nombre en la tarjeta"
            tipo="text"
            nombre="nombreTarjeta"
            valor={nombre}
            alCambiar={setNombre}
            placeholder="Como aparece en la tarjeta"
          />

          <div className="row">
            <div className="col-6">
              <CampoFormulario
                etiqueta="Vencimiento"
                tipo="text"
                nombre="vencimiento"
                valor={vencimiento}
                alCambiar={(texto) => setVencimiento(formatearVencimiento(texto))}
                placeholder="MM/AA"
                inputMode="numeric"
              />
            </div>

            <div className="col-6">
              <CampoFormulario
                etiqueta="CVV"
                tipo="text"
                nombre="cvv"
                valor={cvv}
                alCambiar={(texto) => setCvv(texto.replace(/\D/g, "").slice(0, 3))}
                placeholder="123"
                inputMode="numeric"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <DatosTransferenciaPago monto={monto} />

          <p className="text-muted small">
            Cuando hagas la transferencia, presiona "Ya transferí".
            La veterinaria confirmará tu pago.
          </p>
        </>
      )}

      {error !== "" && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="d-grid">
        <Boton
          texto={metodo === "tarjeta" ? `Pagar ${monto}` : "Ya transferí"}
          type="submit"
          variante="color"
        />
      </div>
    </form>
  );
}

export default FormPago;