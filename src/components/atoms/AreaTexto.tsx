type Props = {
  nombre: string;

  // Texto que tiene actualmente el campo.
  valor: string;

  // Función que recibe el nuevo texto y actualiza el estado del padre.
  alCambiar: (valor: string) => void;
};

function AreaTexto({ nombre, valor, alCambiar }: Props) {
  return (
    <textarea
      name={nombre}
      id={nombre}
      className="form-control"
      // Cantidad de líneas visibles antes de que aparezca el scroll.
      rows={5}
      value={valor}
      onChange={(e) => alCambiar(e.target.value)}
    />
  );
}

export default AreaTexto;