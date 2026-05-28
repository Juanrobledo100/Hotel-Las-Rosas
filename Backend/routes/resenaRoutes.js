const express = require('express');
const router = express.Router();
const { crear, listarPorHabitacion, eliminar } = require('../Controllers/resenaController');
const auth = require('../middleware/auth');

router.post('/', auth, crear);
router.get('/habitacion/:habitacionId', listarPorHabitacion);
router.delete('/:id', auth, eliminar);

module.exports = router;
