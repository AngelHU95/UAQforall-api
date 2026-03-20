const express = require('express');
const router = express.Router();
const db = require('../config/db');

<<<<<<< HEAD

=======
>>>>>>> 316eea7085eac686970bbb13a26eab87c9742716
// GET: Obtener todos los alumnos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Alumnos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error al consultar alumnos", details: error.message });
    }
});

<<<<<<< HEAD

=======
>>>>>>> 316eea7085eac686970bbb13a26eab87c9742716
// GET: Obtener un alumno por su expediente
router.get('/:expediente', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Alumnos WHERE expediente = ?', [req.params.expediente]);
<<<<<<< HEAD

        if (rows.length === 0) {
            return res.status(404).json({ message: "Alumno no encontrado" });
        }

=======
        if (rows.length === 0) return res.status(404).json({ message: "Alumno no encontrado" });
>>>>>>> 316eea7085eac686970bbb13a26eab87c9742716
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

<<<<<<< HEAD

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

=======
// POST: Crear un nuevo alumno
router.post('/', async (req, res) => {
    const { id_alumnos, nombre_alumno, edad, carrera, semestre, expediente } = req.body;

    // Validación básica
    if (!id_alumnos || !nombre_alumno || !expediente) {
        return res.status(400).json({ error: "Faltan campos obligatorios (id, nombre o expediente)" });
    }

    try {
        const query = `INSERT INTO Alumnos (id_alumnos, nombre_alumno, edad, carrera, semestre, expediente) 
                        VALUES (?, ?, ?, ?, ?, ?)`;
        
        await db.query(query, [id_alumnos, nombre_alumno, edad, carrera, semestre, expediente]);

        res.status(201).json({ 
            message: "Alumno registrado con éxito", 
            alumno: { nombre_alumno, expediente } 
        });
    } catch (error) {
        console.log(error); // Esto imprimirá el error detallado en tu terminal de VS Code
        res.status(500).json({ 
        error: "Error al registrar", 
        sqlMessage: error.sqlMessage, // Mensaje directo de MySQL
        code: error.code              // Código del error (ej. ER_DUP_ENTRY)
    });
    }
});

// DELETE: Eliminar un alumno por su expediente
router.delete('/:expediente', async (req, res) => {
    const { expediente } = req.params;

    try {
        const [result] = await db.query('DELETE FROM Alumnos WHERE expediente = ?', [expediente]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No se encontró el expediente" });
        }

        res.json({ message: `Alumno ${expediente} eliminado. ¡Ya puedes volver a registrarlo!` });
>>>>>>> 316eea7085eac686970bbb13a26eab87c9742716
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

<<<<<<< HEAD

=======
>>>>>>> 316eea7085eac686970bbb13a26eab87c9742716
module.exports = router;