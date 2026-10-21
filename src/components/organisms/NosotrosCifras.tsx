// Organismo: sección "Nuestro equipo en números" con 4 tarjetas CardNosotrosCifra.
// Lo usa la página Nosotros.

import CardNosotrosCifra from "../molecules/CardNosotrosCifra";
import { cifrasNosotros } from "../../data/nosotros";

function NosotrosCifras() {
  return (
    <section className="nosotros-seccion">
      <h2 className="titulo-seccion">Nuestro equipo en números</h2>

      {/* En celular: 2 tarjetas por fila. Desde 768px: las 4 en una fila. */}
      <div className="row g-4">
        {cifrasNosotros.map((cifra) => (
          <div key={cifra.texto} className="col-6 col-md-3">
            <CardNosotrosCifra numero={cifra.numero} texto={cifra.texto} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default NosotrosCifras;