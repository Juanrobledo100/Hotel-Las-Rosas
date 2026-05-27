const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  habitacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Habitacion' },
  tipoHabitacion: { type: mongoose.Schema.Types.ObjectId, ref: 'TipoHabitacion' },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  huespedes: { type: Number, default: 1 },
  precioTotal: { type: Number, default: 0 },
  estado: { type: String, enum: ['pendiente', 'confirmada', 'cancelada', 'completada'], default: 'pendiente' }
}, { timestamps: true });

ReservaSchema.index({ habitacion: 1, checkIn: 1, checkOut: 1 });

ReservaSchema.pre('validate', function(next) {
  if (this.checkIn && this.checkOut && this.checkOut <= this.checkIn) {
    return next(new Error('La fecha de salida debe ser posterior a la de entrada'));
  }
  next();
});

module.exports = mongoose.model('Reserva', ReservaSchema);
