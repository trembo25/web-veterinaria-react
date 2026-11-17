// Solo permitimos estos dos roles.
export type Rol = "admin" | "cliente";

// Datos públicos de una cuenta, tal como los devuelve el microservicio usuarios.
// La contraseña nunca llega al frontend: vive cifrada (BCrypt) en bd_usuarios.
export type Usuario = {
  id: number;
  nombre: string;
  email: string;
  rol: Rol;
};

// Datos del usuario que inició sesión (respuesta de POST /auth/login).
// El token (JWT) se envía en "Authorization: Bearer <token>" a los endpoints protegidos.
export type Sesion = {
  nombre: string;
  email: string;
  rol: Rol;
  token: string;
};

// Datos de un servicio de la veterinaria.
export type Servicio = {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  precio?: string;         // 👈 Agrega esta línea
  precioAnterior?: string;
};

// Datos del pago (simulado) de una cita.
// Por seguridad nunca guardamos el número completo de la tarjeta ni el CVV.
export type Pago = {
  codigo: string;                       // ej: "VSM-482913"
  metodo: "tarjeta" | "transferencia";
  monto: string;                        // ej: "$45.000"
  fecha: string;                        // cuándo se pagó, en formato ISO
  estado: "pagado" | "pendiente";       // la transferencia queda pendiente hasta que el admin la confirme
  ultimos4?: string;                    // solo con tarjeta, ej: "4242"
};

// Datos de una cita agendada.
export type Cita = {
  id: number;
  clienteEmail: string;
  clienteNombre: string;
  mascota: string;
  servicio: string;
  fecha: string;

  // Opcional: las citas que todavía no se pagan no lo tienen.
  pago?: Pago;
};

// Datos de un mensaje enviado desde el formulario de contacto.
export type Mensaje = {
  id: number;
  nombre: string;
  correo: string;
  texto: string;
  fecha: string;
};