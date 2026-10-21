// Organismo: sección con las tarjetas de Misión y Visión (CardNosotrosMision).
// Lo usa la página Nosotros.

import CardNosotrosMision from "../molecules/CardNosotrosMision";
import { misionVisionNosotros } from "../../data/nosotros";

function NosotrosMisionVision() {
  return (
    <section className="nosotros-seccion">
      {/* En celular: una debajo de la otra. Desde 768px: lado a lado. */}
      <div className="row g-4">
        {misionVisionNosotros.map((item) => (
          <div key={item.titulo} className="col-12 col-md-6">
            <CardNosotrosMision titulo={item.titulo} texto={item.texto} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default NosotrosMisionVision;