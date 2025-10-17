// Enum para manejar los diferentes estados de una solicitud de adopción.
export enum EstadoAdopcion {
  PENDIENTE = 'pendiente',
  APROBADA = 'aprobada',
  RECHAZADA = 'rechazada'
}

// Interfaz para el objeto Adopcion.
export interface Adopcion {
  id?: string; // ID del documento de la solicitud.
  idSolicitante: string; // UID del usuario que quiere adoptar.
  idMascota: string; // ID de la mascota solicitada.
  nombreMascota: string; // Guardamos el nombre para mostrarlo fácilmente.
  urlImagenMascota: string; // Y la imagen para la UI.
  fechaSolicitud: Date;
  estado: EstadoAdopcion;
  fechaRespuesta?: Date; // Opcional: la fecha en que se aprueba o rechaza.
}
