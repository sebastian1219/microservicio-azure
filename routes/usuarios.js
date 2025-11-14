import express from 'express';
import { poolPromise } from '../db.js';
import sql from 'mssql';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Usuarios');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Error al consultar usuarios');
  }
});

router.post('/', async (req, res) => {
  const { Nombre, Correo, Contraseña } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Nombre', sql.NVarChar, Nombre)
      .input('Correo', sql.NVarChar, Correo)
      .input('Contraseña', sql.NVarChar, Contraseña)
      .query('INSERT INTO Usuarios (Nombre, Correo, Contraseña) VALUES (@Nombre, @Correo, @Contraseña)');
    res.status(201).send('Usuario creado');
  } catch (err) {
    res.status(500).send('Error al crear usuario');
  }
});

export default router;