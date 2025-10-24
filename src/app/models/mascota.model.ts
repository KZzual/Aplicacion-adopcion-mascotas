// src/app/models/mascota.model.ts

// Usamos un Enum para los estados. ¡Adiós a los errores de tipeo!
export enum EstadoMascota {
  DISPONIBLE = 'disponible',
  EN_PROCESO = 'en_proceso',
  ADOPTADO = 'adoptado'
}

export interface Mascota {
  id?: string; // El ID de Firestore es opcional al crear
  nombre: string;
  raza: string;
  fechaNacimiento: Date; // Usar Date es mejor que string para la edad
  genero: 'Macho' | 'Hembra'; // Un tipo literal es más estricto que string
  ubicacion: UbicacionMascota; // Ubicación enriquecida
  tipoAnimal: string;
  vacunado: boolean;
  esterilizado: boolean;
  entrenado: boolean;
  chip: boolean;
  urlImagen: string;
  idUsuarioRegistra: string; // ID del usuario que la subió
  estado: EstadoMascota;
  fechaRegistro: Date;
}

// Tipos para soporte de mapas/ubicación
export enum TipoUbicacion {
  FIJA = 'fija',
  APROXIMADA = 'aproximada'
}

export interface Coordenadas {
  latitud: number;
  longitud: number;
}

export interface UbicacionMascota {
  direccionTexto: string; // Texto legible
  comuna?: string;
  region?: string;
  tipoUbicacion: TipoUbicacion;
  coordenadas?: Coordenadas; // Puede omitirse si solo hay texto
  radioBusquedaKm?: number; // Solo para aproximada
  esUbicacionVerificada?: boolean; // true si viene de GPS
  fechaUbicacion?: Date; // última vez vista
}
