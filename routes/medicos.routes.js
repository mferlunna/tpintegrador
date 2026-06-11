import express from "express";
import MedicosControlador from "../controlador/medicos.controller.js";

import { verificarToken } from "../src/middlewares/auth.middleware.js";
import { verificarRol } from "../src/middlewares/roles.middleware.js";

const router = express.Router();

const controlador = new MedicosControlador();

// Listar médicos (usuarios logueados)
router.get("/", verificarToken, controlador.buscarTodos);

// Asociar médico con especialidades (solo admin)
router.post("/especialidades", verificarToken, verificarRol([3]), controlador.asociarMedicoEspecialidades);

// Obtener obras sociales de un médico (usuarios logueados)
router.get("/:id_medico/obras-sociales", verificarToken, controlador.obtenerObrasSociales);

// Asociar médico con obras sociales (solo admin)
router.post("/obras-sociales", verificarToken, verificarRol([3]), controlador.asociarMedicoObrasSociales);

export { router };