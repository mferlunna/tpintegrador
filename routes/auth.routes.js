import express from "express";
import { login } from "../controlador/auth.controller.js";
import { body } from "express-validator";
import { validarCampos } from "../src/middlewares/validarCampos.middleware.js";
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
 */
router.post(
  "/login",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("El email es obligatorio")
      .isEmail()
      .withMessage("Email inválido"),

    body("contrasenia")
      .notEmpty()
      .withMessage("La contraseña es obligatoria")
  ],
  validarCampos,
  login
);

/**
 * @swagger
 * /auth/perfil:
 *   get:
 *     tags: [Auth]
 *     summary: Perfil del usuario autenticado
 *     security:
 *       - bearerAuth: []
 */
router.get("/perfil", verificarToken, (req, res) => {
  res.json({ msg: "Acceso permitido",
    usuario: req.usuario
  });
});

export default router;