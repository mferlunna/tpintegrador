import express from "express";

import {
    crearEspecialidad,
    listarEspecialidades,
    obtenerEspecialidadPorId,
    editarEspecialidad,
    borrarEspecialidad
    } from "../controlador/especialidades.controller.js";

import { verificarToken } from "../src/middlewares/auth.middleware.js";
import { verificarRol } from "../src/middlewares/roles.middleware.js";
import { validarId } from "../src/middlewares/validarId.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /medicos/especialidades:
 *   post:
 *     tags: [Médicos]
 *     summary: Asociar médico con especialidades
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_medico
 *               - id_especialidad
 *             properties:
 *               id_medico:
 *                 type: integer
 *               id_especialidad:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Asociación creada correctamente
 */

router.get("/", verificarToken, verificarRol([3]), listarEspecialidades);

router.get("/:id_especialidad", verificarToken, verificarRol([3]), validarId, obtenerEspecialidadPorId);


router.post("/", verificarToken, verificarRol([3]), crearEspecialidad);

router.put("/:id_especialidad", verificarToken, verificarRol([3]), validarId, editarEspecialidad);

router.delete("/:id_especialidad", verificarToken, verificarRol([3]), validarId, borrarEspecialidad);

export default router;