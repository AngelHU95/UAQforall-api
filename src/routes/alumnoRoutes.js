const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET: Obtener todos los alumnos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Alumnos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error al consultar alumnos", details: error.message });
    }
});

// GET: Obtener un alumno por su expediente
router.get('/:expediente', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM Alumnos WHERE expediente = ?',
            [req.params.expediente]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Alumno no encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST: Crear un nuevo alumno
router.post('/', async (req, res) => {

    const {
        nombre_alumno,
        fecha_nacimiento,
        semestre,
        expediente,
        correo,
        contrasena,
        id_carrera
    } = req.body;

    // Validación básica
    if (!nombre_alumno || !expediente || !correo || !contrasena) {
        return res.status(400).json({
            error: "Faltan campos obligatorios"
        });
    }

    try {
        const query = `
            INSERT INTO Alumnos
            (nombre_alumno, fecha_nacimiento, semestre, expediente, correo, contrasena, id_carrera)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        await db.query(query, [
            nombre_alumno,
            fecha_nacimiento,
            semestre,
            expediente,
            correo,
            contrasena,
            id_carrera
        ]);

        res.status(201).json({
            message: "Alumno registrado con éxito"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Error al registrar alumno",
            sqlMessage: error.sqlMessage,
            code: error.code
        });
    }
});

// DELETE: Eliminar alumno por expediente
router.delete('/:expediente', async (req, res) => {

    try {
        const [result] = await db.query(
            'DELETE FROM Alumnos WHERE expediente = ?',
            [req.params.expediente]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Alumno no encontrado" });
        }

        res.json({ message: "Alumno eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;