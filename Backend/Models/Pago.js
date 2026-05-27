const mongoose = require('mongoose');

const PagoSchema = new mongoose.Schema({
  reserva: { type: mongoose.Schema.Types.ObjectId, ref: 'Reserva', required: true },
  monto: { type: Number, required: true },
  metodo: { type: String, enum: ['tarjeta', 'efectivo', 'transferencia', 'paypal'], required: true },
  estado: { type: String, enum: ['pendiente', 'pagado', 'fallido', 'reembolsado'], default: 'pendiente' },
  transactionId: { type: String },
  paidAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Pago', PagoSchema);
