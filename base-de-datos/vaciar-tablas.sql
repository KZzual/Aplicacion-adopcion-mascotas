-- Vacía todas las tablas principales (respeta claves foráneas)
TRUNCATE TABLE adopciones, fotos, mascotas, usuarios RESTART IDENTITY CASCADE;
