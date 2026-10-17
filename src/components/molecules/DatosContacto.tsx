import { contacto } from "../../data/contacto";

function DatosContacto() {
  return (
    <div className="bg-light rounded-3 p-3 h-100">
      <h3 className="h5 mb-3">Veterinaria San Marcos</h3>

      <p className="mb-2">
        <strong>Dirección:</strong>
        <br />
        {contacto.direccion}
      </p>

      <p className="mb-2">
        <strong>WhatsApp:</strong>
        <br />
        <a
          href={contacto.whatsappEnlace}
          target="_blank"
          rel="noopener noreferrer"
        >
          {contacto.whatsapp}
        </a>
      </p>

      <p className="mb-2 text-break">
        <strong>Correo:</strong>
        <br />
        <a href={`mailto:${contacto.correo}`}>
          {contacto.correo}
        </a>
      </p>

      <p className="mb-0">
        <strong>Horario:</strong>
        <br />
        {contacto.horario}
      </p>
    </div>
  );
}

export default DatosContacto;