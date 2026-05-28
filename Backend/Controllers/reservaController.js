const Reserva = require('../Models/Reserva');
const Habitacion = require('../Models/Habitacion');
const TipoHabitacion = require('../Models/TipoHabitacion');

// Helper: comprueba solapamiento de fechas
const haySolapamiento = (checkIn, checkOut, existingCheckIn, existingCheckOut) => {
  return (new Date(checkIn) < new Date(existingCheckOut)) && (new Date(checkOut) > new Date(existingCheckIn));
};

exports.crear = async (req, res) => {
  try {
    const { usuario: usuarioBody, habitacion: habitacionId, tipoHabitacion: tipoId, checkIn, checkOut, huespedes } = req.body;

    if (!checkIn || !checkOut) return res.status(400).json({ message: 'checkIn y checkOut requeridos' });
    if (new Date(checkOut) <= new Date(checkIn)) return res.status(400).json({ message: 'checkOut debe ser después de checkIn' });

    let asignada = null;

    if (habitacionId) {
      // Verificar que la habitacion no tenga reservas activas que solapen
      const conflicto = await Reserva.findOne({
        habitacion: habitacionId,
        estado: { $in: ['pendiente', 'confirmada'] },
        $and: [ { checkIn: { $lt: new Date(checkOut) } }, { checkOut: { $gt: new Date(checkIn) } } ]
      });
      if (conflicto) return res.status(400).json({ message: 'La habitación no está disponible en esas fechas' });
      asignada = habitacionId;
    } else if (tipoId) {
      // Buscar una habitacion disponible de ese tipo
      const habitaciones = await Habitacion.find({ tipoHabitacion: tipoId, estado: 'disponible' });
      for (const h of habitaciones) {
        const conflicto = await Reserva.findOne({
          habitacion: h._id,
          estado: { $in: ['pendiente', 'confirmada'] },
          $and: [ { checkIn: { $lt: new Date(checkOut) } }, { checkOut: { $gt: new Date(checkIn) } } ]
        });
        if (!conflicto) { asignada = h._id; break; }
      }
      if (!asignada) return res.status(400).json({ message: 'No hay habitaciones disponibles para ese tipo en las fechas indicadas' });
    }

    // Calcular precio aproximado (no incluye impuestos/descuentos)
    let precioTotal = 0;
    let tipo = null;
    if (tipoId) tipo = await TipoHabitacion.findById(tipoId);
    if (!tipo && asignada) {
      const hab = await Habitacion.findById(asignada).populate('tipoHabitacion');
      tipo = hab.tipoHabitacion;
    }
    if (tipo) {
      const msPorDia = 1000 * 60 * 60 * 24;
      const noches = Math.ceil((new Date(checkOut) - new Date(checkIn)) / msPorDia);
      precioTotal = noches * (tipo.precioBase || 0);
    }

    const reserva = await Reserva.create({
      usuario: usuarioBody || (req.user && req.user._id),
      habitacion: asignada,
      tipoHabitacion: tipoId || (tipo && tipo._id),
      checkIn, checkOut, huespedes, precioTotal
    });

    return res.status(201).json(reserva);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al crear reserva' });
  }
};

exports.listar = async (req, res) => {
  try {
    const filtros = {};
    if (req.query.usuario) filtros.usuario = req.query.usuario;
    if (req.query.habitacion) filtros.habitacion = req.query.habitacion;
    const reservas = await Reserva.find(filtros).populate('usuario').populate('habitacion').populate('tipoHabitacion');
    return res.json(reservas);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al listar reservas' });
  }
};

exports.obtener = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('usuario').populate('habitacion').populate('tipoHabitacion');
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    return res.json(reserva);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al obtener reserva' });
  }
};

exports.cancelar = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    reserva.estado = 'cancelada';
    await reserva.save();
    return res.json({ message: 'Reserva cancelada' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al cancelar reserva' });
  }
};
