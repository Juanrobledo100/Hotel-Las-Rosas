const express = require('express');
const router = express.Router();
const {
  crear,
  listar,
  obtener,
  cancelar
} = require('../Controllers/reservaController');
const auth = require('../middleware/auth');

router.post('/', auth, crear);
router.get('/', auth, listar);
router.get('/:id', auth, obtener);
router.patch('/:id/cancel', auth, cancelar);

module.exports = router;
