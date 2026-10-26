type Props = {
  // A quién "le llega" el correo, ej: "ignacio@gmail.com".
  correo: string;

  // Código de 6 dígitos, ej: "410834".
  codigo: string;
};

// Muestra el código como el correo que enviaría la veterinaria.
// (No hay servidor de correos: es el único lugar donde aparece el código.)
function CorreoSimuladoContrasena({ correo, codigo }: Props) {
  return (
    <div className="alert alert-light border text-start" role="status">
      <p className="fw-semibold mb-1">Veterinaria San Marcos</p>

      <p className="small text-muted mb-2">Para: {correo}</p>

      <p className="mb-0">
        Tu código de verificación es{" "}
        <strong className="font-monospace fs-5">{codigo}</strong>
      </p>
    </div>
  );
}

export default CorreoSimuladoContrasena;