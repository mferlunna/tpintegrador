import express from "express";

import { obtenerEstadisticas } from "../controlador/estadisticas.controller.js";
import { verificarToken } from "../src/middlewares/auth.middleware.js";
import { verificarRol } from "../src/middlewares/roles.middleware.js";

const router = express.Router();

router.get("/", verificarToken, verificarRol([3]), obtenerEstadisticas);

export default router;