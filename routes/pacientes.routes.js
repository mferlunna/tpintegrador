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

router.post("/", verificarToken, verificarRol([3]), crearPaciente);
router.get("/", verificarToken, verificarRol([3]), listarPacientes);
router.put("/:id", verificarToken, verificarRol([3]), actualizarPaciente);
router.delete("/:id", verificarToken, verificarRol([3]), eliminarPaciente);

export default router;