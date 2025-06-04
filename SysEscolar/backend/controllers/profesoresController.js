// backend/controllers/profesoresController.js
const db = require('../db');

exports.getProfesores = (req, res) => {
  db.query('SELECT * FROM profesores', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

exports.addProfesor = (req, res) => {
  const { matricula, nombre, apellido_paterno, apellido_materno, correo, telefono } = req.body;
  db.query('INSERT INTO profesores (matricula, nombre, apellido_paterno, apellido_materno, correo, telefono) VALUES (?, ?, ?, ?, ?, ?)',
    [matricula, nombre, apellido_paterno, apellido_materno, correo, telefono],
    (err) => {
      if (err) return res.status(500).json(err);
      res.sendStatus(200);
    });
};