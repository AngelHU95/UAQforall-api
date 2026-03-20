const express = require('express');
const router = express.Router();
const db = require('../config/db');


// GET: Obtener todas las carreras
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Carreras');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;