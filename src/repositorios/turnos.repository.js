import { pool } from "../db/conexion.js";

export const crearTurnoRepository = async (
  id_medico,
  id_paciente,
  id_obra_social,
  fecha_hora,
  valor_total
) => {
  const sql = `
    INSERT INTO turnos_reservas
    (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido, activo)
    VALUES (?, ?, ?, ?, ?, 0, 1)
  `;

  const [result] = await pool.execute(sql, [
    id_medico,
    id_paciente,
    id_obra_social,
    fecha_hora,
    valor_total
  ]);

  return result;
};

export const obtenerTurnosRepository = async () => {
  const sql = `
    SELECT *
    FROM turnos_reservas
    WHERE activo = 1
  `;

  const [rows] = await pool.query(sql);
  return rows;
};

export const verificarSolapamientoRepository = async (id_medico, inicio, fin) => {
  const sql = `
    SELECT *
    FROM turnos_reservas
    WHERE id_medico = ?
      AND activo = 1
      AND fecha_hora BETWEEN ? AND ?
  `;

  const [rows] = await pool.execute(sql, [id_medico, inicio, fin]);
  return rows;
};

export const agendaSemanalRepository = async (id_medico, inicio, fin) => {
  const sql = `
    SELECT *
    FROM turnos_reservas
    WHERE id_medico = ?
      AND activo = 1
      AND fecha_hora BETWEEN ? AND ?
    ORDER BY fecha_hora ASC
  `;

  const [rows] = await pool.execute(sql, [id_medico, inicio, fin]);
  return rows;
};

export const eliminarTurnoRepository = async (id) => {
  const sql = `
    UPDATE turnos_reservas
    SET activo = 0
    WHERE id_turno_reserva = ?
  `;

  const [result] = await pool.execute(sql, [id]);
  return result;
};