// Definimos los datos que recibe el componente desde su componente padre.
type Props = {
  tipo: string;
  nombre: string;

  // Texto que tiene actualmente el campo.
  valor: string;

  // Función que recibe el nuevo texto y actualiza el estado del padre.
  alCambiar: (valor: string) => void;
};

function Input({ tipo, nombre, valor, alCambiar }: Props) {
  return (
    <input
      // Ejemplos: "text", "email", "password" o "datetime-local".
      type={tipo}

      // Identifica el campo dentro del formulario.
      name={nombre}

      // Permite relacionar el input con su etiqueta.
      id={nombre}

      // Clase de Bootstrap para dar estilo al campo.
      className="form-control"

      // El valor del input depende del estado del componente padre.
      value={valor}

      // Cuando el usuario escribe, enviamos el texto al padre.
      onChange={(e) => alCambiar(e.target.value)}
    />
  );
}

export default Input;