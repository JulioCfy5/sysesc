const db = require('../db');

exports.getCarreras = (req, res) => {
  db.query('SELECT * FROM carreras', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

exports.addCarrera = (req, res) => {
  const { clave, nombre } = req.body;
  db.query('INSERT INTO carreras (clave, nombre) VALUES (?, ?)', [clave, nombre], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(200);
  });
};
