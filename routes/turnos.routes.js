import express from "express";
import {
  crearTurno,
  listarTurnos,
  eliminarTurno,
  agendaSemanal,
  marcarTurnoAtendido,
  listarMisTurnos
} from "../controlador/turnos.controller.js";

import { verificarToken } from "../src/middlewares/auth.middleware.js";
import { verificarRol } from "../src/middlewares/roles.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Turnos
 *   description: Gestión de turnos médicos
 */

/**
 * @swagger
 * /turnos:
 *   get:
 *     tags: [Turnos]
 *     summary: Listar turnos
 *     security:
 *       - bearerAuth: []
 */
router.get("/", verificarToken, verificarRol([3]), listarTurnos);

/**
 * @swagger
 * /turnos:
 *   post:
 *     tags: [Turnos]
 *     summary: Crear turno
 *     security:
 *       - bearerAuth: []
 */
router.post("/", verificarToken, verificarRol([3]), crearTurno);

/**
 * @swagger
 * /turnos/{id}:
 *   delete:
 *     tags: [Turnos]
 *     summary: Eliminar turno
 */
router.delete("/:id", verificarToken, verificarRol([3]), eliminarTurno);

/**
 * @swagger
 * /turnos/agenda:
 *   get:
 *     tags: [Turnos]
 *     summary: Agenda semanal
 */
router.get("/agenda", verificarToken, agendaSemanal);

/**
 * @swagger
 * /turnos/{id}/atendido:
 *   patch:
 *     tags: [Turnos]
 *     summary: Marcar como atendido
 */
router.patch("/:id/atendido", verificarToken, verificarRol([1]), marcarTurnoAtendido);

/**
 * @swagger
 * /turnos/mis-turnos:
 *   get:
 *     tags: [Turnos]
 *     summary: Mis turnos
 */
router.get("/mis-turnos", verificarToken, verificarRol([1, 2]), listarMisTurnos);

export default router;