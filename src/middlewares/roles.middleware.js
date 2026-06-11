export const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        const usuario = req.usuario;

        if (!usuario) {
            return res.status(401).json({ msg: "No autenticado" });
        }

        if (!rolesPermitidos.includes(usuario.rol)) {
            return res.status(403).json({ msg: "No autorizado" });
        }

        next();
    };
};