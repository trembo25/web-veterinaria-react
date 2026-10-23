import type { Cita } from "../../types";

type Props = {
  cita: Cita;

  // Lo que se cobra, ej: "$45.000". Si no hay, mostramos "Por confirmar".
  monto?: string;
};

// Recuadro con los datos de la cita que se está pagando y el total.
function ResumenPago({ cita, monto }: Props) {
  // "2026-10-26T10:00" → hora "10:00".
  const [, hora] = cita.fecha.split("T");

  // "2026-10-26T10:00" → "lunes 26-10-2026".
  const dia = new Date(cita.fecha).toLocaleDateString("es-CL", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    // dl = lista de "dato: valor". row + col-5/col-7 los pone en dos columnas.
    <dl className="row bg-light rounded-3 p-3 mx-0 mb-4 text-start">
      <dt className="col-5">Mascota</dt>
      <dd className="col-7">{cita.mascota}</dd>

      <dt className="col-5">Servicio</dt>
      <dd className="col-7">{cita.servicio}</dd>

      <dt className="col-5">Fecha</dt>
      <dd className="col-7">{dia}</dd>

      <dt className="col-5">Hora</dt>
      <dd className="col-7">{hora}</dd>

      <dt className="col-5">Total</dt>
      <dd className="col-7 fw-bold mb-0">{monto ?? "Por confirmar"}</dd>
    </dl>
  );
}

export default ResumenPago;