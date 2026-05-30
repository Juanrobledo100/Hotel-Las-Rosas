const Habitacion = require('../Models/Habitacion');

exports.crear = async (req, res) => {
  try {
    const { numero, tipoHabitacion, piso, estado } = req.body;
    const hab = await Habitacion.create({ numero, tipoHabitacion, piso, estado });
    return res.status(201).json(hab);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al crear Habitacion' });
  }
};

exports.listar = async (req, res) => {
  try {
    const query = {};
    if (req.query.tipo) query.tipoHabitacion = req.query.tipo;
    const habitaciones = await Habitacion.find(query).populate('tipoHabitacion');
    return res.json(habitaciones);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al listar habitaciones' });
  }
};

exports.obtener = async (req, res) => {
  try {

    let habitacion;

    if (req.params.id) {

      habitacion = await Habitacion
        .findById(req.params.id)
        .populate('tipoHabitacion');

    } else if (req.params.numero) {

      habitacion = await Habitacion
        .findOne({ numero: req.params.numero })
        .populate('tipoHabitacion');

    }

    if (!habitacion) {
      return res.status(404).json({
        message: 'Habitación no encontrada'
      });
    }

    return res.status(200).json(habitacion);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error al obtener habitación'
    });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const hab = await Habitacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hab) return res.status(404).json({ message: 'Habitacion no encontrada' });
    return res.json(hab);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al actualizar habitacion' });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const hab = await Habitacion.findByIdAndDelete(req.params.id);
    if (!hab) return res.status(404).json({ message: 'Habitacion no encontrada' });
    return res.json({ message: 'Habitacion eliminada' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al eliminar habitacion' });
  }
};
