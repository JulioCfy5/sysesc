const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /login → usa lógica del controlador
router.post('/', authController.login);

module.exports = router;
