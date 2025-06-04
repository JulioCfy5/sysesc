const express = require('express');
const router = express.Router();

// Ruta POST para login
router.post('/', (req, res) => {
  const { usuario, password } = req.body;

  if (usuario === 'admin' && password === 'admin') {
    res.json({ acceso: true });
  } else {
    res.status(401).json({ acceso: false });
  }
});

module.exports = router;
