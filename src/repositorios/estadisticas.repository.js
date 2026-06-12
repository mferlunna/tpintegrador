import { pool } from "../db/conexion.js";

export const obtenerEstadisticasRepository = async () => {

  const [rows] = await pool.query(
    "CALL sp_estadisticas_atenciones()"
  );

  return rows[0];
};