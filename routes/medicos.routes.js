import express from "express";
import MedicosControlador from "../controlador/medicos.controller.js";
import { verificarToken } from "../src/middlewares/auth.middleware.js";
import { verificarRol } from "../src/middlewares/roles.middleware.js";

const router = express.Router();

const controlador = new MedicosControlador();

/**
 * @swagger
 * tags:
 *   name: Médicos
 *   description: Gestión de médicos
 */

/**
 * @swagger
 * /medicos:
 *   get:
 *     tags: [Médicos]
 *     summary: Obtener todos los médicos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de médicos
 */
router.get("/", verificarToken, controlador.buscarTodos);

/**
 * @swagger
 * /medicos/especialidades:
 *   post:
 *     tags: [Médicos]
 *     summary: Asociar médico con especialidades
 *     security:
 *       - bearerAuth: []
 */
router.post("/especialidades", verificarToken, verificarRol([3]), controlador.asociarMedicoEspecialidades);

/**
 * @swagger
 * /medicos/{id_medico}/obras-sociales:
 *   get:
 *     tags: [Médicos]
 *     summary: Obtener obras sociales de un médico
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id_medico/obras-sociales", verificarToken, controlador.obtenerObrasSociales);

/**
 * @swagger
 * /medicos/obras-sociales:
 *   post:
 *     tags: [Médicos]
 *     summary: Asociar médico con obras sociales
 *     security:
 *       - bearerAuth: []
 */
router.post("/obras-sociales", verificarToken, verificarRol([3]), controlador.asociarMedicoObrasSociales);

export { router };