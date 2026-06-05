export const validarId = (req, res, next) => {
    const { id_especialidad } = req.params;

    const id = Number(id_especialidad);

    if (!id_especialidad || isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).send({
            estado: false,
            msg: "El ID debe ser un número válido mayor a 0"
        });
    }

    req.params.id_especialidad = id;

    next();
};