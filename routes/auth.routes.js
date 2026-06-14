import express from "express";
import { login } from "../controlador/auth.controller.js";
import { validarLogin } from "../src/middlewares/validarLogin.middleware.js";
import { verificarToken } from "../src/middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuarios
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contrasenia
 *             properties:
 *               email:
 *                 type: string
 *               contrasenia:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token generado correctamente
 */
router.post("/login", validarLogin, login);

router.get("/perfil", verificarToken, (req, res) => {
    res.json({
        msg: "Acceso permitido",
        usuario: req.usuario
    });
});

export default router;