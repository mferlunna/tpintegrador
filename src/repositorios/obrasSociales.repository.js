import { pool } from "../db/conexion.js";


export const crearObraRepository = async (data) => {
    const sql = `
        INSERT INTO obras_sociales 
        (nombre, descripcion, porcentaje_descuento, es_particular, activo)
        VALUES (?, ?, ?, ?, 1)
    `;

    const [result] = await pool.query(sql, [
        data.nombre,
        data.descripcion,
        data.porcentaje_descuento,
        data.es_particular || 0
    ]);

    return result;
};


export const listarObrasRepository = async () => {
    const [rows] = await pool.query(
        "SELECT * FROM obras_sociales WHERE activo = 1"
    );
    return rows;
};


export const obtenerObraPorIdRepository = async (id) => {
    const [rows] = await pool.query(
        "SELECT * FROM obras_sociales WHERE id_obra_social = ? AND activo = 1",
        [id]
    );
    return rows;
};


export const editarObraRepository = async (id, data) => {
    const sql = `
        UPDATE obras_sociales 
        SET nombre = ?, descripcion = ?, porcentaje_descuento = ?, es_particular = ?
        WHERE id_obra_social = ?
    `;

    const [result] = await pool.query(sql, [
        data.nombre,
        data.descripcion,
        data.porcentaje_descuento,
        data.es_particular || 0,
        id
    ]);

    return result;
};


export const eliminarObraRepository = async (id) => {
    const [result] = await pool.query(
        "UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?",
        [id]
    );

    return result;
};