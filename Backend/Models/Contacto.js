const mongoose = require('mongoose');

const ContactoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  nombre: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  telefono: { type: String, trim: true },
  asunto: { type: String, required: true, trim: true },
  mensaje: { type: String, required: true, trim: true },
  estado: { type: String, enum: ['nuevo', 'enviado', 'respondido'], default: 'nuevo' },
  respuesta: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Contacto', ContactoSchema);
