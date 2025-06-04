// backend/routes/alumnos.js
const express = require('express');
const router = express.Router();
const { getAlumnos, addAlumno } = require('../controllers/alumnosController');

router.get('/', getAlumnos);
router.post('/', addAlumno);

module.exports = router;