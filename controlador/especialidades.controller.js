import { pool } from "./conexion.js";

export const crearEspecialidad = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).send({estado: false, msg: "El nombre es obligatorio"});
        }

        const sql = 'INSERT INTO especialidades (nombre) VALUES (?)';

        const [result] = await pool.execute(sql, [nombre]);

        if (result.affectedRows > 0) {
            return res.status(201).send({estado: true, msg: "Especialidad creada", id: result.insertId});
        }

        return res.status(400).send({estado: false, msg: "No se pudo crear la especialidad"});

    } catch (error) {
        console.log(error);

        return res.status(500).send({estado: false, msg: "Error interno"});
    }
};

export const listarEspecialidades = async (req, res) => {
    try {
        const sql = 'SELECT * FROM especialidades WHERE activo = 1';

        const [especialidades] = await pool.query(sql);

        return res.status(200).send({estado: true, data: especialidades});

    } catch (error) {
        console.log(error);

        return res.status(500).send({estado: false, msg: "Error interno"});
    }
};

export const obtenerEspecialidadPorId = async (req, res) => {
    try {
        const id_especialidad = req.params.id_especialidad;

        const sql = 'SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?';

        const [especialidades] = await pool.query(sql, [id_especialidad]);

        if (especialidades.length === 0) {
            return res.status(404).send({estado: false, msg: "Especialidad no encontrada"});
        }

        return res.status(200).send({estado: true, data: especialidades[0]});

    } catch (error) {
        console.log(error);

        return res.status(500).send({estado: false, msg: "Error interno"});
    }
};

export const editarEspecialidad = async (req, res) => {
    try {
        const id = req.params.id_especialidad;
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).send({estado: false, msg: "El nombre es obligatorio"});
        }

        const sql = 'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?';

        const [result] = await pool.query(sql, [nombre, id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({estado: false, msg: "Especialidad no encontrada"});
        }

        return res.status(200).send({estado: true, msg: "Especialidad actualizada"});

    } catch (error) {
        console.log(error);

        return res.status(500).send({estado: false, msg: "Error interno"});
    }
};

export const borrarEspecialidad = async (req, res) => {
    try {
        const id = req.params.id_especialidad;

        const sql = 'UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?';

        const [result] = await pool.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({estado: false, msg: "Especialidad no encontrada"});
        }

        return res.status(200).send({estado: true, msg: "Especialidad eliminada"});

    } catch (error) {
        console.log(error);

        return res.status(500).send({estado: false, msg: "Error interno"});
    }
};