import NavBar from "./NavBar";

function Header() {
  return (
    <header className="header-container">
      {/* Logo y Nombre de la Veterinaria */}
      <div className="logo">
        <span>🐾</span>
        <h2> Veterinaria San Marcos</h2>
      </div>

      {/* Menú de navegación importado */}
      <NavBar />
    </header>
  );
}

export default Header;