import {
    crearEspecialidadRepository,
    obtenerEspecialidadesRepository,
    obtenerEspecialidadPorIdRepository,
    editarEspecialidadRepository,
    borrarEspecialidadRepository
} from "../repositorios/especialidades.repository.js";

export const crearEspecialidadService = async (nombre) => {
    return await crearEspecialidadRepository(nombre);
};

export const listarEspecialidadesService = async () => {
    return await obtenerEspecialidadesRepository();
};

export const obtenerEspecialidadPorIdService = async (id) => {
    return await obtenerEspecialidadPorIdRepository(id);
};

export const editarEspecialidadService = async (id, nombre) => {
    return await editarEspecialidadRepository(id, nombre);
};

export const borrarEspecialidadService = async (id) => {
    return await borrarEspecialidadRepository(id);
};