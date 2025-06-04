// backend/controllers/inscripcionesController.js
const db = require('../db');

exports.addInscripcion = (req, res) => {
  const { alumno_id, carrera_id, semestre, turno, tipo, materias } = req.body;
  db.query('INSERT INTO inscripciones (alumno_id, carrera_id, semestre, turno, tipo) VALUES (?, ?, ?, ?, ?)',
    [alumno_id, carrera_id, semestre, turno, tipo],
    (err, result) => {
      if (err) return res.status(500).json(err);
      const inscripcion_id = result.insertId;
      const valores = materias.map(m => [inscripcion_id, m.materia_id, m.profesor_id, m.hora, m.aula]);
      db.query('INSERT INTO inscripcion_detalle (inscripcion_id, materia_id, profesor_id, hora, aula) VALUES ?',
        [valores],
        (err2) => {
          if (err2) return res.status(500).json(err2);
          res.sendStatus(200);
        });
    });
};
