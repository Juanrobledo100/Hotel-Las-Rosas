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

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en modo ${process.env.NODE_ENV} en puerto ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}\n`);
});