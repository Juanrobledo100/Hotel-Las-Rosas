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
