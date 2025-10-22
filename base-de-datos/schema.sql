
-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  telefono TEXT,
  ciudad TEXT,
  tipo_usuario TEXT DEFAULT 'adoptante', -- adoptante, refugio, admin
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de mascotas
CREATE TABLE IF NOT EXISTS mascotas (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  especie TEXT NOT NULL,
  raza TEXT,
  edad_meses INT,
  genero TEXT,
  ubicacion TEXT,
  url_imagen TEXT,
  vacunado BOOLEAN DEFAULT false,
  esterilizado BOOLEAN DEFAULT false,
  entrenado BOOLEAN DEFAULT false,
  chip TEXT,
  usuario_id BIGINT REFERENCES usuarios(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de fotos (varias por mascota)
CREATE TABLE IF NOT EXISTS fotos (
  id BIGSERIAL PRIMARY KEY,
  mascota_id BIGINT NOT NULL REFERENCES mascotas(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de adopciones
CREATE TABLE IF NOT EXISTS adopciones (
  id BIGSERIAL PRIMARY KEY,
  mascota_id BIGINT NOT NULL REFERENCES mascotas(id) ON DELETE CASCADE,
  usuario_id BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  fecha_adopcion TIMESTAMPTZ NOT NULL DEFAULT now(),
  estado TEXT DEFAULT 'pendiente' -- pendiente, aprobada, rechazada
);
