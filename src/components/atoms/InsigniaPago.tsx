import type { Pago } from "../../types";

type Props = {
  // Usa el mismo tipo que Pago: solo puede ser "pagado" o "pendiente".
  estado: Pago["estado"];
};

// Etiqueta pequeña con el estado del pago de una cita.
function InsigniaPago({ estado }: Props) {
  const pagado = estado === "pagado";

  return (
    // badge = etiqueta de Bootstrap; verde si está pagada, amarilla si está pendiente.
    <span className={pagado ? "badge text-bg-success" : "badge text-bg-warning"}>
      {pagado ? "Pagada" : "Pago pendiente"}
    </span>
  );
}

export default InsigniaPago;