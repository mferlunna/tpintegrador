import express from "express";

import {
  crearObra,
  listarObras,
  editarObra,
  eliminarObra,
  calcularCobertura
} from "../controlador/obrasSociales.controller.js";

import { verificarToken } from "../src/middlewares/auth.middleware.js";
import { verificarRol } from "../src/middlewares/roles.middleware.js";

import { body, param } from "express-validator";
import { validarCampos } from "../src/middlewares/validarCampos.middleware.js";

const router = express.Router();

router.post("/", verificarToken,
  verificarRol([3]),
  [
    body("nombre")
      .notEmpty()
      .withMessage("Nombre obligatorio"),

    body("porcentaje_descuento")
      .isNumeric()
      .withMessage("Debe ser numérico")
  ],
  validarCampos,
  crearObra
);

/**
 * @swagger
 * tags:
 *   name: Obras Sociales
 *   description: Gestión de obras sociales
 */

/**
 * @swagger
 * /obras-sociales:
 *   get:
 *     tags: [Obras Sociales]
 *     summary: Listar obras sociales
 *     security:
 *       - bearerAuth: []
 */
router.get("/", verificarToken, verificarRol([3]), listarObras);

/**
 * @swagger
 * /obras-sociales:
 *   post:
 *     tags: [Obras Sociales]
 *     summary: Crear obra social
 *     security:
 *       - bearerAuth: []
 */
router.post("/", verificarToken, verificarRol([3]), crearObra);

/**
 * @swagger
 * /obras-sociales/{id}:
 *   put:
 *     tags: [Obras Sociales]
 *     summary: Editar obra social
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id",
  verificarToken,
  verificarRol([3]),
  [
    param("id")
      .isInt()
      .withMessage("ID inválido"),

    body("nombre")
      .notEmpty()
      .withMessage("Nombre obligatorio")
      .isString()
      .withMessage("Nombre inválido"),

    body("porcentaje_descuento")
      .isNumeric()
      .withMessage("Debe ser numérico")
  ],
  validarCampos,
  editarObra
);

/**
 * @swagger
 * /obras-sociales/{id}:
 *   delete:
 *     tags: [Obras Sociales]
 *     summary: Eliminar obra social
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id",
  verificarToken,
  verificarRol([3]),
  [
    param("id")
      .isInt()
      .withMessage("ID inválido")
  ],
  validarCampos,
  eliminarObra
);

/**
 * @swagger
 * /obras-sociales/calcular-cobertura:
 *   post:
 *     tags: [Obras Sociales]
 *     summary: Calcular cobertura
 *     security:
 *       - bearerAuth: []
 */
router.post("/calcular-cobertura", verificarToken, calcularCobertura);

export default router;