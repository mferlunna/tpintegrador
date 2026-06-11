import express from "express";
import { login } from "../controlador/auth.controller.js";
import { verificarToken } from "../src/middlewares/auth.middleware.js";
import { verificarRol } from "../src/middlewares/roles.middleware.js";

const router = express.Router();

// LOGIN (publico)
router.post("/login", login);

// TEST PERFIL (cualquier usuario logueado)
router.get("/perfil", verificarToken, (req, res) => {
    res.json({
        msg: "Acceso permitido",
        usuario: req.usuario
    });
});

export default router;