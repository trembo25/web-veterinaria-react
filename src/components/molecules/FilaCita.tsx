import Boton from "../atoms/Boton";
import type { Cita } from "../../types";

type Props = {
  // La cita que mostramos en esta fila.
  cita: Cita;

  // Lo que ocurre al presionar "Cancelar".
  alCancelar: () => void;
};

function FilaCita({ cita, alCancelar }: Props) {
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
        <Boton
          texto="Cancelar"
          variante="transparente"
          onClick={alCancelar}
        />
      </td>
    </tr>
  );
}

export default FilaCita;