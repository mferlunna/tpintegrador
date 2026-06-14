import express from "express";
import {
  crearPaciente,
  listarPacientes,
  actualizarPaciente,
  eliminarPaciente
} from "../controlador/pacientes.controller.js";

import { verificarToken } from "../src/middlewares/auth.middleware.js";
import { verificarRol } from "../src/middlewares/roles.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Gestión de pacientes
 */


/**
 * @swagger
 * /pacientes:
 *   post:
 *     tags: [Pacientes]
 *     summary: Crear paciente
 *     security:
 *       - bearerAuth: []
 */
router.post("/", verificarToken, verificarRol([3]), crearPaciente);


/**
 * @swagger
 * /pacientes:
 *   get:
 *     tags: [Pacientes]
 *     summary: Listar pacientes
 *     security:
 *       - bearerAuth: []
 */
router.get("/", verificarToken, verificarRol([3]), listarPacientes);

/**
 * @swagger
 * /pacientes/{id}:
 *   put:
 *     tags: [Pacientes]
 *     summary: Actualizar paciente
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", verificarToken, verificarRol([3]), actualizarPaciente);

/**
 * @swagger
 * /pacientes/{id}:
 *   delete:
 *     tags: [Pacientes]
 *     summary: Eliminar paciente
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", verificarToken, verificarRol([3]), eliminarPaciente);

export default router;