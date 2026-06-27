import { pool } from "../db/conexion.js";

export const buscarUsuarioPorEmail = async (email) => {
    const [rows] = await pool.query(
        "SELECT * FROM usuarios WHERE email = ? AND activo = 1",
        [email]
    );

    return rows[0];
};