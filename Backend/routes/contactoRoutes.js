const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { crearContacto, listarContactos } = require('../Controllers/contactoController');

// POST público: cualquiera puede enviar un formulario de contacto
router.post('/', crearContacto);
// GET protegido: listar mensajes (solo usuarios autenticados/admin)
router.get('/', auth, listarContactos);

module.exports = router;
