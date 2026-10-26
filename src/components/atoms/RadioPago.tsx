type Props = {
  // Todas las opciones de un mismo grupo comparten el nombre:
  // así el navegador deja elegir solo una.
  nombre: string;

  // Único: relaciona el botón con su etiqueta.
  id: string;

  // Si esta opción es la elegida.
  seleccionado: boolean;

  // Lo que ocurre cuando el usuario elige esta opción.
  alElegir: () => void;
};

// Botón redondo para elegir el método de pago.
function RadioPago({ nombre, id, seleccionado, alElegir }: Props) {
  return (
    <input
      type="radio"
      className="form-check-input"
      name={nombre}
      id={id}
      // El padre decide cuál está marcado (igual que "value" en Input).
      checked={seleccionado}
      onChange={alElegir}
    />
  );
}

export default RadioPago;