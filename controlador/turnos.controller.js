import {
  crearTurnoService,
  obtenerTurnosService,
  eliminarTurnoService,
  agendaSemanalService
} from "../src/servicios/turnos.service.js";

export const crearTurno = async (req, res) => {
  try {
    const {
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora,
      valor_total
    } = req.body;

    const result = await crearTurnoService(
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora,
      valor_total
    );

    return res.status(201).json({
      estado: true,
      mensaje: "Turno creado",
      id: result.insertId
    });

  } catch (error) {
    return res.status(400).json({
      estado: false,
      mensaje: error.message
    });
  }
};

export const listarTurnos = async (req, res) => {
  try {
    const turnos = await obtenerTurnosService();

    return res.status(200).json({
      estado: true,
      turnos
    });

  } catch {
    return res.status(500).json({
      estado: false,
      mensaje: "Error interno"
    });
  }
};

export const agendaSemanal = async (req, res) => {
  try {
    const { id_medico, fecha } = req.query;

    const agenda = await agendaSemanalService(id_medico, fecha);

    return res.status(200).json({
      estado: true,
      agenda
    });

  } catch {
    return res.status(500).json({
      estado: false,
      mensaje: "Error interno"
    });
  }
};

export const eliminarTurno = async (req, res) => {
  try {
    const { id } = req.params;

    await eliminarTurnoService(id);

    return res.status(200).json({
      estado: true,
      mensaje: "Turno eliminado"
    });

  } catch {
    return res.status(500).json({
      estado: false,
      mensaje: "Error interno"
    });
  }
};