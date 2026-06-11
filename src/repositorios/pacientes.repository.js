import { pool } from "../db/conexion.js";

export const crearPacienteRepository = async (nombre, apellido, dni, telefono) => {
  const sql = `
    INSERT INTO pacientes (nombre, apellido, dni, telefono, activo)
    VALUES (?, ?, ?, ?, 1)
  `;

  const [result] = await pool.execute(sql, [
    nombre,
    apellido,
    dni,
    telefono
  ]);

  return result;
};

export const obtenerPacientesRepository = async () => {
  const sql = `
    SELECT *
    FROM pacientes
    WHERE activo = 1
  `;

  const [rows] = await pool.query(sql);
  return rows;
};

export const actualizarPacienteRepository = async (id, data) => {
  const sql = `
    UPDATE pacientes
    SET nombre = ?, apellido = ?, dni = ?, telefono = ?
    WHERE id_paciente = ? AND activo = 1
  `;

  const [result] = await pool.execute(sql, [
    data.nombre,
    data.apellido,
    data.dni,
    data.telefono,
    id
  ]);

  return result;
};

export const eliminarPacienteRepository = async (id) => {
  const sql = `
    UPDATE pacientes
    SET activo = 0
    WHERE id_paciente = ?
  `;

  const [result] = await pool.execute(sql, [id]);
  return result;
};