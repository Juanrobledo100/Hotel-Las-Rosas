const express = require('express');
const router = express.Router();
const { registrar, login, perfil } = require('../Controllers/usuarioController');
const auth = require('../middleware/auth');

router.post('/register', registrar);
router.post('/login', login);
router.get('/profile', auth, perfil);

module.exports = router;
