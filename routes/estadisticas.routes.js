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

router.get("/", verificarToken, verificarRol([3]), obtenerEstadisticas);

router.get("/pdf", generarReportePDF);

export default router;