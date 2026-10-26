import NavBar from "./NavBar";

function Header() {
  return (
    <header className="vet-header">
      {/* Primera fila: logo y nombre de la veterinaria. */}
      <div className="vet-logo">
        <span aria-hidden="true">🐾</span>
        <h2>Veterinaria San Marcos</h2>
      </div>

      {/* Contiene los enlaces y los botones de la sesión. */}
      <NavBar />
    </header>
  );
}

export default Header;