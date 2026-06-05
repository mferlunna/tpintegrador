import { obtenerEspecialidadPorIdRepository } from "../repositorios/especialidades.repository.js";

export const existeEspecialidad = async (req, res, next) => {
    try {
        const { id_especialidad } = req.params;

        const data = await obtenerEspecialidadPorIdRepository(id_especialidad);

        if (!data || data.length === 0) {
            return res.status(404).send({
                estado: false,
                msg: "Especialidad no encontrada"
            });
        }
        
        req.especialidad = data[0];

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            estado: false,
            msg: "Error interno del servidor"
        });
    }
};