const mongoose = require('mongoose');

const TipoHabitacionSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precioBase: { type: Number, required: true },
  maxHuespedes: { type: Number, default: 2 },
  imagenes: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('TipoHabitacion', TipoHabitacionSchema);
