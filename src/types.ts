// Solo permitimos estos dos roles.
export type Rol = "admin" | "cliente";

// Datos completos de una cuenta.
// En esta demostración, las cuentas se guardarán en localStorage.
export type Usuario = {
  nombre: string;
  email: string;
  password: string;
  rol: Rol;
};

// Datos del usuario que inició sesión.
// No necesitamos incluir la contraseña en la sesión.
export type Sesion = {
  nombre: string;
  email: string;
  rol: Rol;
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

// Datos de una cita agendada.
export type Cita = {
  id: number;
  clienteEmail: string;
  clienteNombre: string;
  mascota: string;
  servicio: string;
  fecha: string;
};

// Datos de un mensaje enviado desde el formulario de contacto.
export type Mensaje = {
  id: number;
  nombre: string;
  correo: string;
  texto: string;
  fecha: string;
};