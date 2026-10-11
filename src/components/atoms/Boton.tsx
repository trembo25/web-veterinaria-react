interface BotonProps {
  texto: string;
  variante?: 'color' | 'transparente'; // Para saber si es verde o transparente con borde
  onClick?: () => void;
}

function Boton({ texto, variante = 'color', onClick }: BotonProps) {
  // Aplicamos clases según el tipo de botón
  const claseBoton = variante === 'transparente' ? 'btn-transparente' : 'btn-color';

  return (
    <button className={`btn-custom ${claseBoton}`} onClick={onClick}>
      {texto}
    </button>
  );
}

export default Boton;