import { pool } from "../db/conexion.js";

import {
  crearTurnoRepositoryTx,
  obtenerTurnosRepository,
  verificarSolapamientoRepository,
  agendaSemanalRepository,
  eliminarTurnoRepository,
  marcarTurnoAtendidoRepository,
  obtenerMedicoRepository,
  obtenerObraSocialRepository
} from "../repositorios/turnos.repository.js";

const DURACION_MINUTOS = 40;

export const crearTurnoService = async (
  id_medico,
  id_paciente,
  id_obra_social,
  fecha_hora
) => {

  const conn = await pool.getConnection();

  try {

    await conn.beginTransaction();

    const medico = await obtenerMedicoRepository(
      conn,
      id_medico
    );

    if (!medico) {
      throw new Error("Médico inexistente");
    }

    const obra = await obtenerObraSocialRepository(
      conn,
      id_obra_social
    );

    if (!obra) {
      throw new Error("Obra social inexistente");
    }

    let valor_total;

    if (obra.es_particular === 1) {

      valor_total = Number(
        medico.valor_consulta
      );

    } else {

      valor_total =
        Number(medico.valor_consulta) -
        (
          Number(medico.valor_consulta) *
          Number(obra.porcentaje_descuento) /
          100
        );

    }

    const inicio = new Date(fecha_hora);

    const fin = new Date(
      inicio.getTime() +
      DURACION_MINUTOS * 60000
    );

    const conflicto =
      await verificarSolapamientoRepository(
        id_medico,
        inicio,
        fin
      );

    if (conflicto.length > 0) {
      throw new Error(
        "El médico no está disponible en ese horario (40 min)"
      );
    }

    const result =
      await crearTurnoRepositoryTx(
        conn,
        id_medico,
        id_paciente,
        id_obra_social,
        fecha_hora,
        valor_total
      );

    await conn.commit();

    return result;

  } catch (error) {

    await conn.rollback();

    throw error;

  } finally {

    conn.release();

  }

};

export const obtenerTurnosService = async () => {
  return await obtenerTurnosRepository();
};

export const agendaSemanalService = async (
  id_medico,
  fechaInicio
) => {

  const inicio = new Date(fechaInicio);

  const fin = new Date(inicio);

  fin.setDate(fin.getDate() + 7);

  return await agendaSemanalRepository(
    id_medico,
    inicio,
    fin
  );
};

export const eliminarTurnoService = async (id) => {
  return await eliminarTurnoRepository(id);
};

export const marcarTurnoAtendidoService = async (id) => {
  return await marcarTurnoAtendidoRepository(id);
};
