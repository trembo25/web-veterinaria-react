// Página: Nosotros (/nosotros). Une el encabezado, las secciones y el footer.

import Header from "../components/organisms/Header";
import NosotrosPresentacion from "../components/organisms/NosotrosPresentacion";
import NosotrosCifras from "../components/organisms/NosotrosCifras";
import NosotrosMisionVision from "../components/organisms/NosotrosMisionVision";
import NosotrosLlamado from "../components/organisms/NosotrosLlamado";
import Footer from "../components/organisms/Footer";

function Nosotros() {
  // Usamos la misma estructura de la página de inicio: encabezado, contenido y footer.
  return (
    <div className="inicio-body">
      <Header />

      <NosotrosPresentacion />
      <NosotrosCifras />
      <NosotrosMisionVision />
      <NosotrosLlamado />

      <Footer />
    </div>
  );
}

export default Nosotros;