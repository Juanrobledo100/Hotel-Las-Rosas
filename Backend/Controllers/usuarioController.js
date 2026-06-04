const Usuario = require('../Models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
  return jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.registrar = async (req, res) => {

  try {
    const { nombre, apellido, email, contrasena, telefono } = req.body;

    if (!nombre || !apellido || !email || !contrasena) {
      return res.status(400).json({ message: 'nombre, apellido, email y contrasena son requeridos' });
    }

    const existente = await Usuario.findOne({ email });
    if (existente) return res.status(400).json({ message: 'Usuario ya registrado' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasena, salt);

    const usuario = await Usuario.create({
      nombre,
      apellido,
      email,
      contrasenaHash: hash,
      telefono,
      rol: 'cliente'
    });

    const token = generarToken(usuario);

    return res.status(201).json({
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        telefono: usuario.telefono,
        rol: usuario.rol
      },
      token
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error en el registro' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    if (!email || !contrasena) return res.status(400).json({ message: 'email y contrasena son requeridos' });

    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(401).json({ message: 'Credenciales inválidas' });

    const igual = await bcrypt.compare(contrasena, usuario.contrasenaHash);
    if (!igual) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = generarToken(usuario);

    return res.json({
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        telefono: usuario.telefono,
        rol: usuario.rol
      },
      token
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error en el login' });
  }
};

exports.perfil = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'No autorizado' });
    return res.json({ usuario: req.user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al obtener perfil' });
  }
};
