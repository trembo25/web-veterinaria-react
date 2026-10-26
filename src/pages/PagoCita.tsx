import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import ResumenPago from "../components/molecules/ResumenPago";
import FormPago from "../components/organisms/FormPago";
import ComprobantePago from "../components/organisms/ComprobantePago";

import { useAuth } from "../context/AuthContext";
import { obtenerCitas, guardarPago } from "../data/Citas";
import { obtenerPrecio } from "../data/servicios";
import type { Pago } from "../types";

function PagoCita() {
  // El id viene de la dirección. Ej: /pago/1761222000000 → "1761222000000".
  const { id } = useParams();
  const { usuario } = useAuth();

  // Buscamos la cita una sola vez, al abrir la página.
  const [cita, setCita] = useState(() =>
    obtenerCitas().find((actual) => String(actual.id) === id)
  );

  // Recibe el pago desde FormPago. guardarPago devuelve la cita actualizada:
  // al cambiar el estado, la página se vuelve a dibujar y muestra el comprobante.
  function registrarPago(pago: Pago) {
    if (!cita) {
      return;
    }

    setCita(guardarPago(cita.id, pago));
  }

  // Decide qué mostrar dentro de la tarjeta.
  function mostrarContenido() {
    // Solo el dueño de la cita puede pagarla o ver su comprobante.
    if (!cita || cita.clienteEmail !== usuario?.email) {
      return <p className="text-muted">No encontramos esa cita.</p>;
    }

    // Ya tiene pago: mostramos el resumen con lo que pagó y el comprobante.
    if (cita.pago) {
      return (
        <>
          <ResumenPago cita={cita} monto={cita.pago.monto} />
          <ComprobantePago pago={cita.pago} />
        </>
      );
    }

    const precio = obtenerPrecio(cita.servicio);

    // Servicio sin precio (por ejemplo, uno nuevo creado por el admin).
    if (!precio) {
      return (
        <>
          <ResumenPago cita={cita} />
          <p className="text-muted">
            Este servicio todavía no tiene precio. Consulta el valor con la veterinaria.
          </p>
        </>
      );
    }

    // Sin pagar y con precio: el formulario de pago.
    return (
      <>
        <ResumenPago cita={cita} monto={precio} />
        <FormPago monto={precio} alPagar={registrarPago} />
      </>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm p-4 mb-5 rounded">
            <h2 className="mb-4 text-center">
              {cita?.pago ? "Comprobante de pago" : "Pagar cita"}
            </h2>

            {mostrarContenido()}

            <div className="mt-3 text-center">
              <Link to="/citas">Volver a mis citas</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagoCita;