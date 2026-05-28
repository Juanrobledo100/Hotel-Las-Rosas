const TipoHabitacion = require('../Models/TipoHabitacion');

exports.crear = async (req, res) => {
  try {
    const { nombre, descripcion, precioBase, maxHuespedes, imagenes } = req.body;
    const tipo = await TipoHabitacion.create({ nombre, descripcion, precioBase, maxHuespedes, imagenes });
    return res.status(201).json(tipo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al crear TipoHabitacion' });
  }
};

exports.listar = async (req, res) => {
  try {
    const tipos = await TipoHabitacion.find().sort('nombre');
    return res.json(tipos);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al listar tipos' });
  }
};

exports.obtener = async (req, res) => {
  try {
    const tipo = await TipoHabitacion.findById(req.params.id);
    if (!tipo) return res.status(404).json({ message: 'TipoHabitacion no encontrada' });
    return res.json(tipo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al obtener tipo' });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const tipo = await TipoHabitacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tipo) return res.status(404).json({ message: 'TipoHabitacion no encontrada' });
    return res.json(tipo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al actualizar tipo' });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const tipo = await TipoHabitacion.findByIdAndDelete(req.params.id);
    if (!tipo) return res.status(404).json({ message: 'TipoHabitacion no encontrada' });
    return res.json({ message: 'TipoHabitacion eliminada' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al eliminar tipo' });
  }
};
