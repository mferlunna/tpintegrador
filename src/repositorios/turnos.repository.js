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

export const marcarTurnoAtendidoRepository = async (id) => {

  const sql = `
    UPDATE turnos_reservas
    SET atentido = 1
    WHERE id_turno_reserva = ?
      AND activo = 1
  `;

  const [result] = await pool.execute(sql, [id]);

  return result;
};
export const obtenerMedicoRepository = async (conn, id_medico) => {

  const [rows] = await conn.execute(
    `
    SELECT valor_consulta
    FROM medicos
    WHERE id_medico = ?
    `,
    [id_medico]
  );

  return rows[0];
};

export const obtenerObraSocialRepository = async (
  conn,
  id_obra_social
) => {

  const [rows] = await conn.execute(
    `
    SELECT
      porcentaje_descuento,
      es_particular
    FROM obras_sociales
    WHERE id_obra_social = ?
      AND activo = 1
    `,
    [id_obra_social]
  );

  return rows[0];
};

export const crearTurnoRepositoryTx = async (
  conn,
  id_medico,
  id_paciente,
  id_obra_social,
  fecha_hora,
  valor_total
) => {

  const [result] = await conn.execute(
    `
    INSERT INTO turnos_reservas
    (
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora,
      valor_total,
      atentido,
      activo
    )
    VALUES (?, ?, ?, ?, ?, 0, 1)
    `,
    [
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora,
      valor_total
    ]
  );

  return result;
};

export const obtenerMisTurnosRepository = async (idUsuario, rol) => {

  let sql = "";
  let params = [idUsuario];

  if (rol === 1) {

    sql = `
      SELECT tr.*
      FROM turnos_reservas tr
      INNER JOIN medicos m
        ON tr.id_medico = m.id_medico
      WHERE m.id_usuario = ?
        AND tr.activo = 1
      ORDER BY tr.fecha_hora ASC
    `;

  } else if (rol === 2) {

    sql = `
      SELECT tr.*
      FROM turnos_reservas tr
      INNER JOIN pacientes p
        ON tr.id_paciente = p.id_paciente
      WHERE p.id_usuario = ?
        AND tr.activo = 1
      ORDER BY tr.fecha_hora ASC
    `;

  } else {

    throw new Error("Rol inválido");

  }

  const [rows] = await pool.execute(sql, params);

  return rows;

};