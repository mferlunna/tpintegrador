import Medicos from "../db/medicos.js";
import MedicosRespuestaDTO from "../descuentos/medicosRespuestaDTO.js";
import { obtenerObraPorIdService } from "./obrasSociales.service.js";
import { obtenerEspecialidadPorIdService } from "./especialidades.service.js";

export default class MedicosServicio {

    constructor() {
        this.medicos = new Medicos();
    }

    buscarPorId = async (id_medico) => {

        const medico = await this.medicos.buscarPorId(id_medico);

        if (!medico) {
            return null;
        }

        return new MedicosRespuestaDTO(medico);
    }

    buscarTodos = async () => {

        const datos = await this.medicos.buscarTodos();

        return datos.map(
            row => new MedicosRespuestaDTO(row)
        );
    }

    asociarMedicoEspecialidades = async (
    id_medico,
    especialidades
) => {

    const medico =
        await this.medicos.buscarPorId(
            id_medico
        );

    if (!medico) {
        throw new Error(
            "MEDICO_NO_EXISTE"
        );
    }

    for (const esp of especialidades) {

        const especialidad =
            await obtenerEspecialidadPorIdService(
                esp.id_especialidad
            );

        if (
            !especialidad ||
            especialidad.length === 0
        ) {
            throw new Error(
                "ESPECIALIDAD_NO_EXISTE"
            );
        }
    }

    return await this.medicos.relacionarConEspecialidad(
        id_medico,
        especialidades
    );
}
    obtenerObrasSociales = async (id_medico) => {

    const medico =
        await this.medicos.buscarPorId(id_medico);

    if (!medico) {
        throw new Error("MEDICO_NO_EXISTE");
    }

    return await this.medicos.obtenerObrasSociales(
        id_medico
    );
}

   asociarMedicoObrasSociales = async (
    id_medico,
    obras_sociales
    ) => {

    const medico = await this.medicos.buscarPorId(
        id_medico
    );

    if (!medico) {
        throw new Error("MEDICO_NO_EXISTE");
    }

    for (const os of obras_sociales) {

        try {

            await obtenerObraPorIdService(
                os.id_obra_social
            );

        } catch {

            throw new Error(
                "OBRA_SOCIAL_NO_EXISTE"
            );
        }
    }

    return await this.medicos.relacionarConObraSocial(
        id_medico,
        obras_sociales
        );
    }
}