// Molécula: tarjeta con un título y un texto (Misión o Visión).
// La usa NosotrosMisionVision, en la página Nosotros.

type Props = {
  // "Misión" o "Visión".
  titulo: string;
  texto: string;
};

function CardNosotrosMision({ titulo, texto }: Props) {
  return (
    <div className="card-nosotros-mision">
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </div>
  );
}

export default CardNosotrosMision;