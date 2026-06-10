import {
    crearObraService,
    listarObrasService,
    obtenerObraPorIdService,
    editarObraService,
    eliminarObraService,
    calcularCoberturaService
} from "../src/servicios/obrasSociales.service.js";;

export const crearObra = async (req, res) => {
    try {
        const result = await crearObraService(req.body);

        res.status(201).send({
            estado: true,
            id: result.insertId
        });

    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

export const listarObras = async (req, res) => {
    try {
        const data = await listarObrasService();

        res.send({
            estado: true,
            data
        });

    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};


export const editarObra = async (req, res) => {
    try {
        const result = await editarObraService(
            req.params.id,
            req.body
        );

        if (result.affectedRows === 0) {
            return res.status(404).send({
                error: "No existe"
            });
        }

        res.send({
            estado: true,
            msg: "Actualizada"
        });

    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

export const eliminarObra = async (req, res) => {
    try {
        const result = await eliminarObraService(req.params.id);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                error: "No existe"
            });
        }

        res.send({
            estado: true,
            msg: "Eliminada"
        });

    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

export const calcularCobertura = async (req, res) => {
    try {
        const { id_obra_social, valor_consulta } = req.body;

        const obra = await obtenerObraPorIdService(id_obra_social);

        const result = calcularCoberturaService(
            obra,
            valor_consulta
        );

        res.send({
            obra_social: obra.nombre,
            valor_consulta,
            ...result
        });

    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};