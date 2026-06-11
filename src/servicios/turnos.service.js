import {
  crearTurnoRepository,
  obtenerTurnosRepository,
  verificarSolapamientoRepository,
  agendaSemanalRepository,
  eliminarTurnoRepository
} from "../repositorios/turnos.repository.js";

const DURACION_MINUTOS = 40;

export const crearTurnoService = async (
  id_medico,
  id_paciente,
  id_obra_social,
  fecha_hora,
  valor_total
) => {

  const inicio = new Date(fecha_hora);
  const fin = new Date(inicio.getTime() + DURACION_MINUTOS * 60000);

  const conflicto = await verificarSolapamientoRepository(
    id_medico,
    inicio,
    fin
  );

  if (conflicto.length > 0) {
    throw new Error("El médico no está disponible en ese horario (40 min)");
  }

  return await crearTurnoRepository(
    id_medico,
    id_paciente,
    id_obra_social,
    fecha_hora,
    valor_total
  );
};

export const obtenerTurnosService = async () => {
  return await obtenerTurnosRepository();
};

export const agendaSemanalService = async (id_medico, fechaInicio) => {

  const inicio = new Date(fechaInicio);
  const fin = new Date(inicio);
  fin.setDate(fin.getDate() + 7);

  return await agendaSemanalRepository(id_medico, inicio, fin);
};

export const eliminarTurnoService = async (id) => {
  return await eliminarTurnoRepository(id);
};