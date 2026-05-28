const Pago = require('../Models/Pago');
const Reserva = require('../Models/Reserva');

exports.crear = async (req, res) => {
  try {
    const { reserva: reservaId, monto, metodo, estado, transactionId, paidAt } = req.body;
    if (!reservaId || !monto || !metodo) return res.status(400).json({ message: 'reserva, monto y metodo son requeridos' });

    const pago = await Pago.create({ reserva: reservaId, monto, metodo, estado: estado || 'pendiente', transactionId, paidAt });

    if (pago.estado === 'pagado') {
      await Reserva.findByIdAndUpdate(reservaId, { estado: 'confirmada' });
    }

    return res.status(201).json(pago);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al crear pago' });
  }
};

exports.obtener = async (req, res) => {
  try {
    const pago = await Pago.findById(req.params.id).populate('reserva');
    if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
    return res.json(pago);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al obtener pago' });
  }
};

exports.listar = async (req, res) => {
  try {
    const filtros = {};
    if (req.query.reserva) filtros.reserva = req.query.reserva;
    const pagos = await Pago.find(filtros).populate('reserva');
    return res.json(pagos);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al listar pagos' });
  }
};
