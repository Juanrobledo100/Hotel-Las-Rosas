const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { subirImagen, obtenerImagenes } = require('../Controllers/uploadController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nombre = req.body.filename ? req.body.filename : path.basename(file.originalname, ext);
    const finalName = `${nombre}${ext}`;
    cb(null, finalName);
  }
});

const upload = multer({ storage });

router.get('/', obtenerImagenes);

router.post('/', upload.single('image'), subirImagen);


module.exports = router;
