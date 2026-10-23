type Props = {
  // A quién "le llega" el correo, ej: "nacho@gmail.com".
  correo: string;

  // Código de 6 dígitos, ej: "482913".
  codigo: string;
};

// Simula el correo que enviaría la veterinaria con el código.
// En una página real el código llega al correo y nunca se muestra en pantalla.
function CorreoSimuladoContrasena({ correo, codigo }: Props) {
  return (
    // role="status": los lectores de pantalla leen el aviso cuando aparece.
    <div className="alert alert-info text-start" role="status">
      <p className="fw-semibold mb-1">Correo simulado</p>

      <p className="small mb-2">Para: {correo}</p>

      <p className="mb-2">
        Tu código para restablecer la contraseña es{" "}
        <strong className="font-monospace fs-5">{codigo}</strong>
      </p>

      <p className="small mb-0">
        Como el proyecto no tiene servidor de correos, el código aparece aquí.
      </p>
    </div>
  );
}

export default CorreoSimuladoContrasena;