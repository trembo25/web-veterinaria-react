import { cuentaPago } from "../../data/contacto";

type Props = {
  // Monto a transferir, ej: "$45.000".
  monto: string;
};

// Datos de la cuenta de la veterinaria para pagar por transferencia.
function DatosTransferenciaPago({ monto }: Props) {
  return (
    <div className="border rounded-3 p-3 mb-3 text-start">
      <p className="fw-semibold mb-2">
        Transfiere {monto} a esta cuenta:
      </p>

      <ul className="list-unstyled mb-0">
        <li><strong>Titular:</strong> {cuentaPago.titular}</li>
        <li><strong>RUT:</strong> {cuentaPago.rut}</li>
        <li><strong>Banco:</strong> {cuentaPago.banco}</li>
        <li><strong>Tipo de cuenta:</strong> {cuentaPago.tipoCuenta}</li>
        <li><strong>Número:</strong> {cuentaPago.numero}</li>
        <li><strong>Correo:</strong> {cuentaPago.correo}</li>
      </ul>
    </div>
  );
}

export default DatosTransferenciaPago;