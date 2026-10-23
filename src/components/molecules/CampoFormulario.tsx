import Input from "../atoms/Input";
import Etiqueta from "../atoms/Etiqueta";

type Props = {
  etiqueta: string;
  tipo: string;
  nombre: string;
  valor: string;
  alCambiar: (valor: string) => void;
  // Opcionales: solo los usa el campo de fecha de la agenda.
  min?: string;
  max?: string;
  // Opcionales: solo los usan los campos de la tarjeta en el pago.
  placeholder?: string;
  inputMode?: "numeric" | "text";
};

function CampoFormulario({
  etiqueta,
  tipo,
  nombre,
  valor,
  alCambiar,
  min,
  max,
  placeholder,
  inputMode,
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
        min={min}
        max={max}
        placeholder={placeholder}
        inputMode={inputMode}
      />
    </div>
  );
}

export default CampoFormulario;