const jwt = require('jsonwebtoken');
const Usuario = require('../Models/Usuario');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado, token faltante' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id).select('-contrasenaHash');
    if (!usuario) return res.status(401).json({ message: 'Usuario no encontrado' });
    req.user = usuario;
    next();
  } catch (err) {
    console.error('auth error', err.message);
    return res.status(401).json({ message: 'Token inválido' });
  }
};
