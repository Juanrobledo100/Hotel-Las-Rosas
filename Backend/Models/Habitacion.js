const mongoose = require('mongoose');

const HabitacionSchema = new mongoose.Schema({
  numero: { type: String, required: true, unique: true },
  tipoHabitacion: { type: mongoose.Schema.Types.ObjectId, ref: 'TipoHabitacion', required: true },
  piso: { type: Number },
  estado: { type: String, enum: ['disponible', 'mantenimiento', 'bloqueada'], default: 'disponible' }
}, { timestamps: true });

module.exports = mongoose.model('Habitacion', HabitacionSchema);
