type Props = {
  // Texto que verá el usuario.
  texto: string;

  // Debe coincidir con el id del input al que pertenece.
  para: string;
};

function Etiqueta({ texto, para }: Props) {
  return (
    <label
      // Relaciona esta etiqueta con un input.
      htmlFor={para}
      className="form-label"
    >
      {texto}
    </label>
  );
}

export default Etiqueta;