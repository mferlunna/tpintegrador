import MedicosServicio from "../src/servicios/medicos.service.js";

export default class MedicosControlador {

    constructor() {
        this.medicos = new MedicosServicio();
    }

    buscarTodos = async (req, res) => {
        try{
            const medicos = await this.medicos.buscarTodos();

            res.status(200).json(
                {
                    'estado': true, 
                    'mensaje': 'Médicos encontrados.',
                    'medicos': medicos
                }
            );

        }catch(error) {
        console.log(`Error en GET /medicos ${error}`);
        return res.status(500).json({
        estado: false,
        mensaje: 'Error interno'
    });
}
}

    asociarMedicoEspecialidades = async (req,res) => {

    try {

        const {
            id_medico,
            especialidades
        } = req.dto;

        const relacion =
            await this.medicos.asociarMedicoEspecialidades(
                id_medico,
                especialidades
            );

        if (!relacion) {
            return res.status(400).json({
                estado: false,
                mensaje:
                    "No se crearon las relaciones."
            });
        }

        return res.status(201).json({
            estado: true,
            mensaje:
                "Médico y especialidades relacionadas."
        });

    } catch (error) {

        if (
            error.message ===
            "MEDICO_NO_EXISTE"
        ) {
            return res.status(404).json({
                estado: false,
                mensaje:
                    "El médico no existe."
            });
        }

        if (
            error.message ===
            "ESPECIALIDAD_NO_EXISTE"
        ) {
            return res.status(404).json({
                estado: false,
                mensaje:
                    "Una o más especialidades no existen."
            });
        }

        console.log(
            `Error en POST /medicos/especialidades ${error}`
        );

        return res.status(500).json({
            estado: false,
            mensaje:
                "Error interno."
        });
    }
}
    obtenerObrasSociales = async (req, res) => {

    try {

        const { id_medico } = req.params;

        const obras =
            await this.medicos.obtenerObrasSociales(
                id_medico
            );

        return res.status(200).json({
            estado: true,
            obras_sociales: obras
        });

    } catch (error) {

        if (error.message === "MEDICO_NO_EXISTE") {
            return res.status(404).json({
                estado: false,
                mensaje: "El médico no existe."
            });
        }

        console.log(error);

        return res.status(500).json({
            estado: false,
            mensaje: "Error interno."
        });
    }
}
    asociarMedicoObrasSociales = async (req, res) => {

    try {

        const { id_medico, obras_sociales } = req.dto;

        const relacion =
            await this.medicos.asociarMedicoObrasSociales(
                id_medico,
                obras_sociales
            );

        if (!relacion) {
            return res.status(400).json({
                estado: false,
                mensaje: "No se crearon las relaciones."
            });
        }

        return res.status(201).json({
            estado: true,
            mensaje: "Médico y obras sociales relacionadas."
        });

        } catch (error) {

        if (error.message === "MEDICO_NO_EXISTE") {
            return res.status(404).json({
                estado: false,
                mensaje: "El médico no existe."
            });
        }

        if (error.message === "OBRA_SOCIAL_NO_EXISTE") {
            return res.status(404).json({
                estado: false,
                mensaje: "Una o más obras sociales no existen."
            });
        }

        console.log(
            `Error en POST /medicos/obras-sociales ${error}`
        );

        return res.status(500).json({
            estado: false,
            mensaje: "Error interno."
        });
    }
}
}