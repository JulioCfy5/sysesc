// backend/routes/materias.js
const express = require('express');
const router = express.Router();
const { getMaterias, addMateria } = require('../controllers/materiasController');

router.get('/', getMaterias);
router.post('/', addMateria);

module.exports = router;