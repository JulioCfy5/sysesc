// backend/controllers/materiasController.js
const db = require('../db');

exports.getMaterias = (req, res) => {
  db.query('SELECT * FROM materias', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

exports.addMateria = (req, res) => {
  const { clave, nombre } = req.body;
  db.query('INSERT INTO materias (clave, nombre) VALUES (?, ?)', [clave, nombre], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(200);
  });
};