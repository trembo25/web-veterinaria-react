import InsigniaPago from "../atoms/InsigniaPago";
import type { Pago } from "../../types";

type Props = {
  pago: Pago;
};

// Comprobante que se muestra después de pagar (y cada vez que se vuelve a abrir).
function ComprobantePago({ pago }: Props) {
  const pagado = pago.estado === "pagado";

  return (
    <div>
      {/* Verde si ya está pagado; amarillo si la transferencia espera confirmación. */}
      <div
        className={pagado ? "alert alert-success" : "alert alert-warning"}
        role="status"
      >
        {pagado
          ? "¡Pago realizado con éxito!"
          : "Recibimos tu aviso de transferencia. La veterinaria confirmará el pago."}
      </div>

      <dl className="row text-start mx-0 mb-0">
        <dt className="col-5">Código</dt>
        <dd className="col-7 font-monospace">{pago.codigo}</dd>

        <dt className="col-5">Estado</dt>
        <dd className="col-7">
          <InsigniaPago estado={pago.estado} />
        </dd>

        <dt className="col-5">Método</dt>
        <dd className="col-7">
          {pago.metodo === "tarjeta"
            ? `Tarjeta terminada en ${pago.ultimos4}`
            : "Transferencia bancaria"}
        </dd>

        <dt className="col-5">Fecha del pago</dt>
        <dd className="col-7 mb-0">
          {/* "2026-10-23T12:30:00.000Z" → "23-10-2026, 9:30:00" (hora de Chile). */}
          {new Date(pago.fecha).toLocaleString("es-CL")}
        </dd>
      </dl>
    </div>
  );
}

export default ComprobantePago;