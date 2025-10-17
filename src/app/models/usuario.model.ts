// Roles de usuario definidos para controlar permisos en la app.
export type RolUsuario = 'usuario' | 'administrador';

// Interfaz para el objeto Usuario.
// IMPORTANTE: Nota que no hay campo 'password'. La contraseña nunca debe
// ser almacenada en la base de datos de Firestore. Se gestiona únicamente
// a través de Firebase Authentication.
export interface Usuario {
  uid: string; // Este ID viene directamente de Firebase Auth.
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string; // El teléfono puede ser opcional.
  rol: RolUsuario;
}
