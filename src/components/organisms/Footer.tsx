import { Link } from "react-router-dom";
import { contacto } from "../../data/contacto";

function Footer() {
  return (
    <footer className="vet-footer">
      <div className="container">
        {/* Tres columnas (4 + 5 + 3 = 12). En celular se apilan centradas. */}
        <div className="row g-4 text-center text-md-start">
          {/* COLUMNA 1: nombre de la veterinaria */}
          <div className="col-12 col-md-4">
            <h3 className="vet-footer-titulo">
              <span aria-hidden="true">🐾</span> Veterinaria San Marcos
            </h3>
            <p className="vet-footer-texto">
              Cuidando a tus mascotas en Rancagua desde 2009.
            </p>
          </div>

          {/* COLUMNA 2: datos de contacto (un poco más ancha) */}
          <div className="col-12 col-md-5">
            <h3 className="vet-footer-titulo">Contacto</h3>
            <ul className="vet-footer-lista">
              <li>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href={contacto.whatsappEnlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nowrap"
                >
                  {contacto.whatsapp}
                </a>
              </li>
              <li>
                <strong>Correo:</strong>{" "}
                <a href={`mailto:${contacto.correo}`}>
                  {contacto.correo}
                </a>
              </li>
              <li>
                <strong>Dirección:</strong> {contacto.direccion}
              </li>
              <li>
                <strong>Horario:</strong> {contacto.horario}
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: redes y contacto */}
          <div className="col-12 col-md-3">
            <h3 className="vet-footer-titulo">Síguenos</h3>
            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
              <a
                href={contacto.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-sm rounded-pill px-3"
              >
                Instagram
              </a>
              <Link
                to="/contacto"
                className="btn btn-outline-light btn-sm rounded-pill px-3"
              >
                Escríbenos
              </Link>
            </div>
          </div>
        </div>

        {/* Franja final con el copyright. */}
        <p className="vet-footer-copy">
          © {new Date().getFullYear()} Veterinaria San Marcos. Todos los
          derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;