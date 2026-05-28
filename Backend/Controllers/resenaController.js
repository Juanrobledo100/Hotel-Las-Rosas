const Resena = require('../Models/Resena');

exports.crear = async (req, res) => {
  try {
    const { usuario: usuarioBody, habitacion: habitacionId, puntuacion, comentario } = req.body;
    if (!puntuacion || !habitacionId) return res.status(400).json({ message: 'puntuacion y habitacion son requeridos' });

    const resena = await Resena.create({ usuario: usuarioBody || (req.user && req.user._id), habitacion: habitacionId, puntuacion, comentario });
    return res.status(201).json(resena);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al crear reseña' });
  }
};

exports.listarPorHabitacion = async (req, res) => {
  try {
    const habitacionId = req.params.habitacionId;
    const resenas = await Resena.find({ habitacion: habitacionId }).populate('usuario');
    return res.json(resenas);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al listar reseñas' });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const r = await Resena.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ message: 'Reseña no encontrada' });
    return res.json({ message: 'Reseña eliminada' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al eliminar reseña' });
  }
};
