import express from "express";
import { obtenerEstadisticas } from "../controlador/estadisticas.controller.js";
import { generarReportePDF } from "../controlador/Pdf.js";
import { verificarToken } from "../src/middlewares/auth.middleware.js";
import { verificarRol } from "../src/middlewares/roles.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Estadísticas
 *   description: Reportes del sistema
 */

/**
 * @swagger
 * /estadisticas:
 *   get:
 *     tags: [Estadísticas]
 *     summary: Obtener estadísticas de atención
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas correctamente
 */
router.get("/", verificarToken, verificarRol([3]), obtenerEstadisticas);

/**
 * @swagger
 * /estadisticas/pdf:
 *   get:
 *     tags: [Estadísticas]
 *     summary: Descargar reporte PDF
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: PDF generado correctamente
 */
router.get("/pdf", generarReportePDF);

export default router;