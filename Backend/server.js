const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const tipoHabitacionRoutes = require('./routes/tipoHabitacionRoutes');
const habitacionRoutes = require('./routes/habitacionRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const pagoRoutes = require('./routes/pagoRoutes');
const resenaRoutes = require('./routes/resenaRoutes');

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/tipos-habitacion', tipoHabitacionRoutes);
app.use('/api/habitaciones', habitacionRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/resenas', resenaRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en modo ${process.env.NODE_ENV} en puerto ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}\n`);
});