import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

app.get('/health', (_req, res) => res.json({ ok: true }));

// Mascotas CRUD (mínimo)
app.get('/api/mascotas', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, nombre, especie, raza, edad_meses, genero, ubicacion, url_imagen, vacunado, esterilizado, entrenado, chip FROM mascotas ORDER BY id DESC LIMIT 50');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/mascotas', async (req, res) => {
  const { nombre, especie, raza, edad_meses, genero, ubicacion, url_imagen, vacunado, esterilizado, entrenado, chip } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO mascotas (nombre, especie, raza, edad_meses, genero, ubicacion, url_imagen, vacunado, esterilizado, entrenado, chip)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING id`,
       [nombre, especie, raza, edad_meses, genero, ubicacion, url_imagen, vacunado, esterilizado, entrenado, chip]
    );
    res.status(201).json({ id: rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

const port = process.env.PORT || 4444;
const server = app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    pool.end(() => console.log('DB pool closed'));
  });
});
