import express from "express";

import {
  crearTurno,
  listarTurnos,
  eliminarTurno,
  agendaSemanal
} from "../controlador/turnos.controller.js";

import { verificarToken } from "../src/middlewares/auth.middleware.js";
import { verificarRol } from "../src/middlewares/roles.middleware.js";

const router = express.Router();

router.post("/", verificarToken, verificarRol([3]), crearTurno);
router.get("/", verificarToken, verificarRol([3]), listarTurnos);
router.delete("/:id", verificarToken, verificarRol([3]), eliminarTurno);

router.get("/agenda", verificarToken, agendaSemanal);

export default router;