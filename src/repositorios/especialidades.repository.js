import { pool } from "../db/conexion.js";

export const crearEspecialidadRepository = async (nombre) => {
    const sql = `
        INSERT INTO especialidades (nombre)
        VALUES (?)
    `;

    const [result] = await pool.execute(sql, [nombre]);

    return result;
};

export const obtenerEspecialidadesRepository = async () => {
    const sql = `
        SELECT *
        FROM especialidades
        WHERE activo = 1
    `;

    const [rows] = await pool.query(sql);

    return rows;
};

export const obtenerEspecialidadPorIdRepository = async (id) => {
    const sql = `
        SELECT *
        FROM especialidades
        WHERE activo = 1
        AND id_especialidad = ?
    `;

    const [rows] = await pool.query(sql, [id]);

    return rows;
};

export const editarEspecialidadRepository = async (id, nombre) => {
    const sql = `
        UPDATE especialidades
        SET nombre = ?
        WHERE id_especialidad = ?
    `;

    const [result] = await pool.query(sql, [nombre, id]);

    return result;
};

export const borrarEspecialidadRepository = async (id) => {
    const sql = `
        UPDATE especialidades
        SET activo = 0
        WHERE id_especialidad = ?
    `;

    const [result] = await pool.query(sql, [id]);

    return result;
};