import express from "express";
import MedicosControlador from "../controlador/medicos.controller.js";
import { verificarToken } from "../src/middlewares/auth.middleware.js";
import { verificarRol } from "../src/middlewares/roles.middleware.js";

const router = express.Router();

const controlador = new MedicosControlador();

router.get("/", verificarToken, controlador.buscarTodos);

router.post("/especialidades", verificarToken, verificarRol([3]), controlador.asociarMedicoEspecialidades);

router.get("/:id_medico/obras-sociales", verificarToken, controlador.obtenerObrasSociales);

router.post("/obras-sociales", verificarToken, verificarRol([3]), controlador.asociarMedicoObrasSociales);

export { router };