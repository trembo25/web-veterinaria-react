import Select from "../atoms/Select";
import Etiqueta from "../atoms/Etiqueta";

type Props = {
  etiqueta: string;
  nombre: string;
  valor: string;
  alCambiar: (valor: string) => void;
  opciones: string[];
  textoInicial: string;
};

function CampoSelect({
  etiqueta,
  nombre,
  valor,
  alCambiar,
  opciones,
  textoInicial,
}: Props) {
  return (
    <div className="mb-3">
      <Etiqueta texto={etiqueta} para={nombre} />

      <Select
        nombre={nombre}
        valor={valor}
        alCambiar={alCambiar}
        opciones={opciones}
        textoInicial={textoInicial}
      />
    </div>
  );
}

export default CampoSelect;