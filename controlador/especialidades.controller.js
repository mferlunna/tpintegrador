import { pool } from "./conexion.js";

export const crearEspecialidad = async (req, res) => {
   
    try {
        const { nombre } = req.body;

        const sql = 'INSERT INTO especialidades (nombre) VALUES (?)';

        const [result] = await pool.execute(sql, [nombre]);

        if (result.affectedRows > 0) {

            res.status(201).send({estado: true, msg: `Id creado ${result.insertId}`});

        }

    } catch (error) {

        console.log(error);

        res.status(500).send({estado: false, msg: "error interno"});

    }
};

export const listarEspecialidades = async (req, res) => {

    try {

        const sql = 'SELECT * FROM especialidades WHERE activo = 1';

        const [especialidades] =  await pool.query(sql);

        res.status(200).send({estado: true, especialidades });

    } catch (error) {

        console.log(error);

    }
};

export const obtenerEspecialidadPorId = async (req, res) => {

    try {
        const id_especialidades =
        req.params.id_especialidades;

        const sql = `SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?`;

        const [especialidades] = await pool.query(sql, [id_especialidades]);

        res.status(200).send({estado: true, especialidades});

    } catch (error) {

        console.log(error);

    }
};

export const editarEspecialidad = async (req, res) => {

    try {
        const id = req.params.id_especialidades;

        const { nombre } = req.body;

        const sql = `UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?`;

        const [result] = await pool.query(sql, [nombre, id]);

        res.status(200).send({estado: true, msg: "Especialidad actualizada"});

    } catch (error) {

        console.log(error);

        res.status(500).send({estado: false, msg: "error interno"});

    }
};

export const borrarEspecialidad = async (req, res) => {

    try {
        const id = req.params.id_especialidades;

        const sql = `UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?`;

        await pool.query(sql, [id]);

        res.status(200).send({estado: true, msg: "Especialidad eliminada"});
        
    } catch (error) {

        console.log(error);

        res.status(500).send({estado: false, msg: "error interno"});

    }
};