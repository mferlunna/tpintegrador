export const validarId = (req, res, next) => {
    const { id } = req.params;

    const idNumerico = Number(id);

    if (!id || isNaN(idNumerico) || !Number.isInteger(idNumerico) || idNumerico <= 0) {
        return res.status(400).send({
            estado: false,
            msg: "El ID debe ser un número válido mayor a 0"
        });
    }

    req.params.id = idNumerico;

    next();
};