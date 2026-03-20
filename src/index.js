const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
require('dotenv').config({ path: __dirname + '/.env' });

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
=======
require('dotenv').config();
>>>>>>> 316eea7085eac686970bbb13a26eab87c9742716

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba (Health Check)
app.get('/', (req, res) => {
  res.json({ message: "API de Juegos de Mesa funcionando correctamente" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const db = require('./config/db'); // Importa la conexión que creaste arriba

// Nueva ruta para probar la base de datos
app.get('/check-db', async (req, res) => {
  try {
    // Intentamos una consulta simple que no requiere tablas existentes
    const [rows] = await db.query('SELECT "Conexión Exitosa" AS mensaje, NOW() AS fecha');
    res.json({
      status: "conectado",
      datos: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "No se pudo conectar a Railway",
      details: error.message
    });
  }
});

const alumnoRoutes = require('./routes/alumnoRoutes');
<<<<<<< HEAD
const carrerasRoutes = require('./routes/carrerasRoutes');

// ... debajo de tus otros app.use
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/carreras', carrerasRoutes);
=======

// ... debajo de tus otros app.use
app.use('/api/alumnos', alumnoRoutes);
>>>>>>> 316eea7085eac686970bbb13a26eab87c9742716
