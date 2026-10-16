function DatosContacto() {
  return (
    <div className="bg-light rounded-3 p-3 h-100">
      <h3 className="h5 mb-3">Veterinaria San Marcos</h3>

      <p className="mb-2">
        <strong>Dirección:</strong>
        <br />
        Av. Principal #123, Rancagua
      </p>

      <p className="mb-2">
        <strong>WhatsApp:</strong>
        <br />
        <a
          href="https://wa.me/56930722838"
          target="_blank"
          rel="noopener noreferrer"
        >
          +56 9 30722838
        </a>
      </p>

      <p className="mb-2 text-break">
        <strong>Correo:</strong>
        <br />
        <a href="mailto:vete_san_marcoR@gmail.com">
          vete_san_marcoR@gmail.com
        </a>
      </p>

      <p className="mb-0">
        <strong>Horario:</strong>
        <br />
        Lunes a viernes, 08:00 a 20:00
      </p>
    </div>
  );
}

export default DatosContacto;