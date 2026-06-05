export const validarEspecialidad = (req, res, next) => {
    const { nombre } = req.body;

    if (!nombre || nombre.trim() === "") {
        return res.status(400).send({
            estado: false,
            msg: "El nombre es obligatorio"
        });
    }

    next();
};