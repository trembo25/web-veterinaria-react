// Molécula: tarjeta con una cifra (ej: "25 Pacientes al día").
// La usa NosotrosCifras, en la página Nosotros.

type Props = {
  // El número grande, por ejemplo "25".
  numero: string;

  // Lo que significa ese número, por ejemplo "Pacientes al día".
  texto: string;
};

function CardNosotrosCifra({ numero, texto }: Props) {
  return (
    <div className="card-nosotros-cifra">
      <p className="card-nosotros-cifra-numero">{numero}</p>
      <p className="card-nosotros-cifra-texto">{texto}</p>
    </div>
  );
}

export default CardNosotrosCifra;