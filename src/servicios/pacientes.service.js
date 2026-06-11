import {
  crearPacienteRepository,
  obtenerPacientesRepository,
  actualizarPacienteRepository,
  eliminarPacienteRepository
} from "../repositorios/pacientes.repository.js";

export const crearPacienteService = async (nombre, apellido, dni, telefono) => {
  return await crearPacienteRepository(nombre, apellido, dni, telefono);
};

export const obtenerPacientesService = async () => {
  return await obtenerPacientesRepository();
};

export const actualizarPacienteService = async (id, data) => {
  return await actualizarPacienteRepository(id, data);
};

export const eliminarPacienteService = async (id) => {
  return await eliminarPacienteRepository(id);
};