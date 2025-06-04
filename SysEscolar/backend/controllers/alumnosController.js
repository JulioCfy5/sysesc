// backend/controllers/alumnosController.js
const db = require('../db');

exports.getAlumnos = (req, res) => {
  db.query('SELECT * FROM alumnos', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

exports.addAlumno = (req, res) => {
  const { matricula, nombre, apellido_paterno, apellido_materno, correo, telefono } = req.body;
  db.query('INSERT INTO alumnos (matricula, nombre, apellido_paterno, apellido_materno, correo, telefono) VALUES (?, ?, ?, ?, ?, ?)',
    [matricula, nombre, apellido_paterno, apellido_materno, correo, telefono],
    (err) => {
      if (err) return res.status(500).json(err);
      res.sendStatus(200);
    });
};