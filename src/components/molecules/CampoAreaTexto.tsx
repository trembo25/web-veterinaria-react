import AreaTexto from "../atoms/AreaTexto";
import Etiqueta from "../atoms/Etiqueta";

type Props = {
  etiqueta: string;
  nombre: string;
  valor: string;
  alCambiar: (valor: string) => void;
};

function CampoAreaTexto({ etiqueta, nombre, valor, alCambiar }: Props) {
  return (
    <div className="mb-3">
      <Etiqueta texto={etiqueta} para={nombre} />

      <AreaTexto
        nombre={nombre}
        valor={valor}
        alCambiar={alCambiar}
      />
    </div>
  );
}

export default CampoAreaTexto;