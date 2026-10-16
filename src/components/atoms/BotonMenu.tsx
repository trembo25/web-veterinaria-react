type Props = {
  // true = el menú está abierto, false = está cerrado.
  abierto: boolean;

  // Lo que ocurre al presionar el botón.
  onClick: () => void;
};

function BotonMenu({ abierto, onClick }: Props) {
  return (
    <button
      type="button"
      className="btn-custom btn-transparente"
      aria-label="Menú de usuario"
      aria-expanded={abierto}
      onClick={onClick}
    >
      {/* Las tres rayas se dibujan con CSS, no necesitan imagen. */}
      <span className="btn-menu-icono" aria-hidden="true">
        <span className="btn-menu-raya" />
        <span className="btn-menu-raya" />
        <span className="btn-menu-raya" />
      </span>
    </button>
  );
}

export default BotonMenu;