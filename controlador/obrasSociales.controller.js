import { pool } from "./conexion.js";

export const crearObraSocial = async (req, res) => {

    try {

        const {
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular
        } = req.body;

        if (
            !nombre ||
            !descripcion ||
            porcentaje_descuento == null
        ) {
            return res.status(400).send({error: "Faltan datos"});
        }

        if (
            porcentaje_descuento < 0 ||
            porcentaje_descuento > 100
        ) {
            return res.status(400).send({error: "El porcentaje debe estar entre 0 y 100"});
        }

        const [obraExistente] = await pool.query("SELECT * FROM obras_sociales WHERE nombre = ?",[nombre]);

        if (obraExistente.length > 0) {
            return res.status(400).send({error: "La obra social ya existe"});
        }

        const [result] = await pool.query(`INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular, activo) VALUES (?, ?, ?, ?, 1)`,
            [
                nombre,
                descripcion,
                porcentaje_descuento,
                es_particular || 0
            ]
        );

        res.send({estado: true, id: result.insertId});

    } catch (error) {

        res.status(500).send({ error: error.message});

    }

};

export const listarObras = async (req, res) => {

    try {

        const [rows] = await pool.query("SELECT * FROM obras_sociales WHERE activo = 1");

        res.send({estado: true, obras: rows}) 

    } catch (error) {

        res.status(500).send({error: error.message});

    }

};

export const editarObra = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular
        } = req.body;

        if (
            !nombre ||
            !descripcion ||
            porcentaje_descuento == null
        ) {
            return res.status(400).send({error: "Faltan datos"});
        }

        if (
            porcentaje_descuento < 0 ||
            porcentaje_descuento > 100
        ) {
            return res.status(400).send({error: "El porcentaje debe estar entre 0 y 100"});
        }

        const [obra] = await pool.query("SELECT * FROM obras_sociales WHERE id_obra_social = ? AND activo = 1",[id]);

        if (obra.length === 0) {
            return res.status(404).send({error: "La obra social no existe"});
        }

        await pool.query(`UPDATE obras_sociales SET nombre = ?, descripcion = ?, porcentaje_descuento = ?, es_particular = ? WHERE id_obra_social = ?`,
            [
                nombre,
                descripcion,
                porcentaje_descuento,
                es_particular || 0,
                id
            ]
        );

        res.send({estado: true, msg: "Obra social actualizada"});

    } catch (error) {

        res.status(500).send({error: error.message});

    }

};

export const eliminarObra = async (req, res) => {

    try {

        const { id } = req.params;

        const [obra] = await pool.query("SELECT * FROM obras_sociales WHERE id_obra_social = ? AND activo = 1", [id]);

        if (obra.length === 0) {
            return res.status(404).send({error: "La obra social no existe"});
        }

        await pool.query("UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?", [id]);

        res.send({estado: true, msg: "Obra social eliminada"});

    } catch (error) {

        res.status(500).send({error: error.message});

    }

};

export const calcularCobertura = async (req, res) => {

    try {

        const {
            id_obra_social,
            valor_consulta
        } = req.body;

        if (
            !id_obra_social ||
            !valor_consulta
        ) {
            return res.status(400).send({error: "Faltan datos"});
        }

        const [obra] = await pool.query("SELECT * FROM obras_sociales WHERE id_obra_social = ? AND activo = 1", [id_obra_social]);

        if (obra.length === 0) {
            return res.status(404).send({error: "La obra social no existe"});
        }

        const porcentaje = obra[0].porcentaje_descuento;

        if (obra[0].es_particular == 1) {

            return res.send({
                obra_social: obra[0].nombre,
                valor_consulta,
                cobertura: 0,
                monto_cubierto: 0,
                monto_paciente: valor_consulta,
                mensaje: "Paciente particular"
            });

        }

        const monto_cubierto =
            (valor_consulta * porcentaje) / 100;

        const monto_paciente =
            valor_consulta - monto_cubierto;

        res.send({obra_social: obra[0].nombre, valor_consulta, cobertura: porcentaje, monto_cubierto, monto_paciente});

    } catch (error) {

        res.status(500).send({error: error.message});

    }

};