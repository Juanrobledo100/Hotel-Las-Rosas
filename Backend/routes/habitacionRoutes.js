const express = require('express');
const router = express.Router();
const {
  crear,
  listar,
  obtener,
  actualizar,
  eliminar
} = require('../Controllers/habitacionController');

router.post('/', crear);
router.get('/', listar);
router.get('/numero/:numero', obtener);
router.get('/:id', obtener);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

module.exports = router;
