import {
    crearEspecialidadService,
    listarEspecialidadesService,
    obtenerEspecialidadPorIdService,
    editarEspecialidadService,
    borrarEspecialidadService
} from "../src/servicios/especialidades.service.js";


export const crearEspecialidad = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).send({
                estado: false,
                msg: "El nombre es obligatorio"
            });
        }

        const result = await crearEspecialidadService(nombre);

        return res.status(201).send({
            estado: true,
            msg: "Especialidad creada",
            id: result.insertId
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ estado: false, msg: "Error interno" });
    }
};


export const listarEspecialidades = async (req, res) => {
    try {
        const data = await listarEspecialidadesService();

        return res.status(200).send({
            estado: true,
            data
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ estado: false, msg: "Error interno" });
    }
};


export const obtenerEspecialidadPorId = async (req, res) => {
    try {
        const id = req.params.id_especialidad;

        const data = await obtenerEspecialidadPorIdService(id);

        if (data.length === 0) {
            return res.status(404).send({
                estado: false,
                msg: "Especialidad no encontrada"
            });
        }

        return res.status(200).send({
            estado: true,
            data: data[0]
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ estado: false, msg: "Error interno" });
    }
};


export const editarEspecialidad = async (req, res) => {
    try {
        const id = req.params.id_especialidad;
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).send({
                estado: false,
                msg: "El nombre es obligatorio"
            });
        }

        const result = await editarEspecialidadService(nombre, id);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                estado: false,
                msg: "Especialidad no encontrada"
            });
        }

        return res.status(200).send({
            estado: true,
            msg: "Especialidad actualizada"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ estado: false, msg: "Error interno" });
    }
};


export const borrarEspecialidad = async (req, res) => {
    try {
        const id = req.params.id_especialidad;

        const result = await borrarEspecialidadService(id);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                estado: false,
                msg: "Especialidad no encontrada"
            });
        }

        return res.status(200).send({
            estado: true,
            msg: "Especialidad eliminada"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ estado: false, msg: "Error interno" });
    }
};