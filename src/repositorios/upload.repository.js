import { pool } from "../db/conexion.js";

export const actualizarFotoUsuario = async (idUsuario, rutaArchivo) => {

    const [resultado] = await pool.query(
        "UPDATE usuarios SET foto_path = ? WHERE id_usuario = ?",
        [rutaArchivo, idUsuario]
    );

    return resultado;
};