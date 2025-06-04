// backend/routes/profesores.js
const express = require('express');
const router = express.Router();
const { getProfesores, addProfesor } = require('../controllers/profesoresController');

router.get('/', getProfesores);
router.post('/', addProfesor);

module.exports = router;