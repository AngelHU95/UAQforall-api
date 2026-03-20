const mysql = require('mysql2');
<<<<<<< HEAD
require('dotenv').config({ path: '../../.env' });
=======
require('dotenv').config();
>>>>>>> 316eea7085eac686970bbb13a26eab87c9742716

const pool = mysql.createPool({
    host: process.env.DB_HOST,     // Esto lee la variable del archivo .env
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool.promise();