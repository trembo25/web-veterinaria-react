import RadioPago from "../atoms/RadioPago";
import Etiqueta from "../atoms/Etiqueta";

type Props = {
  // Nombre del grupo, ej: "metodo".
  grupo: string;

  // Valor de esta opción, ej: "tarjeta".
  valor: string;

  // Texto que ve el usuario, ej: "Tarjeta de crédito o débito".
  texto: string;

  seleccionado: boolean;
  alElegir: () => void;
};

// Una opción de método de pago: el botón redondo y su texto al lado.
function OpcionPago({ grupo, valor, texto, seleccionado, alElegir }: Props) {
  // id único, ej: "metodo-tarjeta". Une el botón con su etiqueta:
  // así también se puede elegir haciendo clic en el texto.
  const id = `${grupo}-${valor}`;

  return (
    // form-check = clase de Bootstrap que alinea el botón con su texto.
    <div className="form-check">
      <RadioPago
        nombre={grupo}
        id={id}
        seleccionado={seleccionado}
        alElegir={alElegir}
      />

      <Etiqueta texto={texto} para={id} />
    </div>
  );
}

export default OpcionPago;