import express from "express";
import { login } from "../controlador/auth.controller.js";
import { verificarToken } from "../src/middlewares/auth.middleware.js";

const router = express.Router();

// LOGIN
router.post("/login", login);

// RUTA PROTEGIDA (TEST JWT)
router.get("/perfil", verificarToken, (req, res) => {
    res.json({
        msg: "Acceso permitido",
        usuario: req.usuario
    });
});

export default router;