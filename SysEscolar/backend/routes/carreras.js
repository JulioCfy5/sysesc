const express = require('express');
const router = express.Router();
const { getCarreras, addCarrera } = require('../controllers/carrerasController');

router.get('/', getCarreras);
router.post('/', addCarrera);

module.exports = router;
