import Input from "../atoms/Input";
import Etiqueta from "../atoms/Etiqueta";

type Props = {
  etiqueta: string;
  tipo: string;
  nombre: string;
  valor: string;
  alCambiar: (valor: string) => void;
};

function CampoFormulario({
  etiqueta,
  tipo,
  nombre,
  valor,
  alCambiar,
}: Props) {
  return (
    <div className="mb-3">
      {/* El nombre identifica tanto la etiqueta como el input. */}
      <Etiqueta
        texto={etiqueta}
        para={nombre}
      />

      {/* Pasamos los datos del formulario hacia el átomo Input. */}
      <Input
        tipo={tipo}
        nombre={nombre}
        valor={valor}
        alCambiar={alCambiar}
      />
    </div>
  );
}

export default CampoFormulario;