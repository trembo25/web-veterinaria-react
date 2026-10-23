import Boton from "../atoms/Boton";
import InsigniaPago from "../atoms/InsigniaPago";
import type { Cita } from "../../types";

type Props = {
  // La cita que mostramos en esta fila.
  cita: Cita;

  // Precio del servicio, ej: "$45.000". Si no tiene, no se puede pagar en línea.
  precio?: string;

  // Lo que ocurre al presionar "Cancelar".
  alCancelar: () => void;

  // Abre la página del pago (para pagar o para ver el comprobante).
  alIrAlPago: () => void;
};

function FilaCita({ cita, precio, alCancelar, alIrAlPago }: Props) {
  // "2026-10-19T10:00" se separa en "2026-10-19" y "10:00".
  const [dia, hora] = cita.fecha.split("T");

  // "2026-10-19" queda como "19-10-2026".
  const fecha = dia.split("-").reverse().join("-");

  // Nombre del día en español, por ejemplo "lunes".
  const diaSemana = new Date(cita.fecha).toLocaleDateString("es-CL", {
    weekday: "long",
  });

  return (
    <tr>
      <td>{cita.mascota}</td>
      <td>{cita.servicio}</td>
      <td>
        {/* text-nowrap evita que "19-10-2026" se corte en el guion. */}
        {diaSemana} <span className="text-nowrap">{fecha}</span>
      </td>
      <td>{hora}</td>
      <td>
        {cita.pago ? (
          // Ya pagada (o transferencia pendiente): etiqueta y comprobante.
          // No se puede cancelar: para eso hay que contactar a la veterinaria.
          <div className="d-flex align-items-center flex-wrap gap-2 text-nowrap">
            <InsigniaPago estado={cita.pago.estado} />
            <Boton
              texto="Ver comprobante"
              variante="transparente"
              onClick={alIrAlPago}
            />
          </div>
        ) : (
          // Sin pagar: Pagar (si el servicio tiene precio) y Cancelar.
          <div className="d-flex align-items-center flex-wrap gap-2 text-nowrap">
            {precio ? (
              <Boton texto="Pagar" variante="color" onClick={alIrAlPago} />
            ) : (
              <span className="text-muted small">Precio por confirmar</span>
            )}
            <Boton
              texto="Cancelar"
              variante="transparente"
              onClick={alCancelar}
            />
          </div>
        )}
      </td>
    </tr>
  );
}

export default FilaCita;