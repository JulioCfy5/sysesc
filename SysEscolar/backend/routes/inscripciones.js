// backend/routes/inscripciones.js
const express = require('express');
const router = express.Router();
const { addInscripcion } = require('../controllers/inscripcionesController');

router.post('/', addInscripcion);

module.exports = router;