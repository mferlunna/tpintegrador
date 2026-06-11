import {
  crearPacienteService,
  obtenerPacientesService,
  actualizarPacienteService,
  eliminarPacienteService
} from "../src/servicios/pacientes.service.js";

export const crearPaciente = async (req, res) => {
  try {
    const { nombre, apellido, dni, telefono } = req.body;

    const result = await crearPacienteService(
      nombre,
      apellido,
      dni,
      telefono
    );

    return res.status(201).json({
      estado: true,
      mensaje: "Paciente creado",
      id: result.insertId
    });

  } catch (error) {
    return res.status(500).json({
      estado: false,
      mensaje: "Error interno"
    });
  }
};

export const listarPacientes = async (req, res) => {
  try {
    const pacientes = await obtenerPacientesService();

    return res.status(200).json({
      estado: true,
      pacientes
    });

  } catch {
    return res.status(500).json({
      estado: false,
      mensaje: "Error interno"
    });
  }
};

export const actualizarPaciente = async (req, res) => {
  try {
    const { id } = req.params;

    await actualizarPacienteService(id, req.body);

    return res.status(200).json({
      estado: true,
      mensaje: "Paciente actualizado"
    });

  } catch {
    return res.status(500).json({
      estado: false,
      mensaje: "Error interno"
    });
  }
};

export const eliminarPaciente = async (req, res) => {
  try {
    const { id } = req.params;

    await eliminarPacienteService(id);

    return res.status(200).json({
      estado: true,
      mensaje: "Paciente eliminado"
    });

  } catch {
    return res.status(500).json({
      estado: false,
      mensaje: "Error interno"
    });
  }
};