Backend Express + Postgres (Neon)

Requisitos
- Node 18+
- Una base de datos en Neon (PostgreSQL 15/16/17)

Configuración
1) Copia .env.example a .env y completa DATABASE_URL con la cadena de conexión de Neon.
2) (Opcional) Ajusta PORT si no quieres 4000.

Scripts
- npm run dev: inicia el servidor con nodemon (recarga en caliente)
- npm start: inicia el servidor en modo producción

Endpoints
- GET /health -> { ok: true }
- GET /api/mascotas -> lista últimas 50 mascotas
- POST /api/mascotas -> crea una mascota
  body JSON ejemplo:
  {
    "nombre": "Luna",
    "especie": "perro",
    "raza": "mestizo",
    "edad_meses": 24,
    "genero": "hembra",
    "ubicacion": "Santiago",
    "url_imagen": "https://...",
    "vacunado": true,
    "esterilizado": false,
    "entrenado": false,
    "chip": "123-ABC"
  }

SQL base (ejecuta en Neon una vez):
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
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

Notas
- DATABASE_URL debe incluir ssl; Neon normalmente lo exige. Este server fuerza SSL (rejectUnauthorized=false).
- Este backend es mínimo para pruebas; añade autenticación, validación y manejo de errores según necesites.
