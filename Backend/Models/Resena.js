const mongoose = require('mongoose');

const ResenaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  habitacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Habitacion' },
  puntuacion: { type: Number, min: 1, max: 5, required: true },
  comentario: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Resena', ResenaSchema);
