const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  contrasenaHash: { type: String, required: true },
  telefono: { type: String },
  rol: { type: String, enum: ['cliente', 'admin'], default: 'cliente' }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', UsuarioSchema);
