type Props = {
  nombre: string;
  valor: string;
  alCambiar: (valor: string) => void;
  opciones: string[];
  textoInicial: string;
};

function Select({ nombre, valor, alCambiar, opciones, textoInicial }: Props) {
  return (
    <select
      name={nombre}
      id={nombre}
      className="form-select"
      value={valor}
      onChange={(e) => alCambiar(e.target.value)}
    >
      <option value="">{textoInicial}</option>

      {opciones.map((opcion) => (
        <option key={opcion} value={opcion}>
          {opcion}
        </option>
      ))}
    </select>
  );
}

export default Select;