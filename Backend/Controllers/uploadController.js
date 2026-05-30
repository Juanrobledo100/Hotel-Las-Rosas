const fs = require('fs');
const path = require('path');

exports.subirImagen = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se subió ningún archivo' });
    }

    const ruta = `/uploads/${req.file.filename}`;
    return res.status(201).json({ filename: req.file.filename, url: ruta });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al subir imagen' });
  }
};

exports.obtenerImagenes = async (req, res) => {
  try {

    const carpeta = path.join(__dirname, '../uploads');

    fs.readdir(carpeta, (err, archivos) => {

      if (err) {
        return res.status(500).json({
          message: 'Error al leer imágenes'
        });
      }

      const imagenes = archivos.map((archivo) => ({
        nombre: archivo,
        url: `/uploads/${archivo}`
      }));

      return res.status(200).json(imagenes);

    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error obteniendo imágenes'
    });
  }
};
