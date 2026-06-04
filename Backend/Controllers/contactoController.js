const Contacto = require('../Models/Contacto');

exports.crearContacto = async (req, res) => {
  try {
    const { nombre, email, telefono, asunto, mensaje } = req.body;

    if (!nombre || !email || !asunto || !mensaje) {
      return res.status(400).json({ message: 'Nombre, email, asunto y mensaje son requeridos' });
    }

    const usuarioId = req.user ? req.user._id : undefined;

    const contacto = await Contacto.create({
      ...(usuarioId && { usuario: usuarioId }),
      nombre,
      email,
      telefono,
      asunto,
      mensaje,
      estado: 'nuevo'
    });

    return res.status(201).json({ message: 'Formulario de contacto enviado correctamente', contacto });
  } catch (err) {
    console.error('crearContacto error', err);
    return res.status(500).json({ message: 'Error al enviar el formulario de contacto' });
  }
};

exports.listarContactos = async (req, res) => {
  try {
    const filtro = req.user.rol === 'admin' ? {} : { usuario: req.user._id };
    const contactos = await Contacto.find(filtro)
      .sort({ createdAt: -1 })
      .populate('usuario', 'nombre apellido email');

    return res.json({ contactos });
  } catch (err) {
    console.error('listarContactos error', err);
    return res.status(500).json({ message: 'Error al obtener los mensajes de contacto' });
  }
};
