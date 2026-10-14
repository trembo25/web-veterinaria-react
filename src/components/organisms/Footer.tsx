function Footer() {
  return (
    <footer className="bg-primary text-white py-4 mt-auto">
      <div className="container">
        
        {/* Usamos d-flex con flex-column para móvil y flex-md-row para pantallas medianas/grandes */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-center text-md-start">
          
          {/* COLUMNA 1: Copyright e información de marca */}
          <div className="footer-copyright">
            <span className="mb-0 fw-semibold">
              © {new Date().getFullYear()} Veterinaria San Marcos.
            </span>
            <p className="small mb-0 text-white-50">Todos los derechos reservados.</p>
          </div>

          {/* COLUMNA 2: Información de Contacto (Formateada en líneas independientes) */}
          <div className="footer-contacto">
            <p className="fw-bold mb-1">¿Necesitas ayuda?</p>
            <p className="mb-1 small">
              <strong>WhatsApp:</strong>{" "}
              <a 
                href="https://wa.me/56930722838" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white text-decoration-underline"
              >
                +56 9 30722838
              </a>
            </p>
            <p className="mb-0 small">
              <strong>Correo:</strong>{" "}
              <a 
                href="mailto:vete_san_marcoR@gmail.com" 
                className="text-white text-decoration-underline"
              >
                vete_san_marcoR@gmail.com
              </a>
            </p>
          </div>

          {/* COLUMNA 3: Redes Sociales (Alineadas como botones/enlaces interactivos) */}
          <div className="footer-redes">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline-light btn-sm rounded-pill px-3"
            >
              Instagram
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;