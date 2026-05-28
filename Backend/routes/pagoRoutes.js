const express = require('express');
const router = express.Router();
const { crear, obtener, listar } = require('../Controllers/pagoController');
const auth = require('../middleware/auth');

router.post('/', auth, crear);
router.get('/', auth, listar);
router.get('/:id', auth, obtener);

module.exports = router;
