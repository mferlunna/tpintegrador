import express from "express";
import {
    crearEspecialidad,
    listarEspecialidades,
    obtenerEspecialidadPorId,
    editarEspecialidad,
    borrarEspecialidad
} from "../controlador/especialidades.controller.js";

import { existeEspecialidad } from "../src/middlewares/existeEspecialidad.middleware.js";
import { validarId } from "../src/middlewares/validarId.middleware.js";
import { validarEspecialidad } from "../src/middlewares/validarEspecialidad.middleware.js";

const router = express.Router();


router.post("/", validarEspecialidad, crearEspecialidad);

router.put("/:id_especialidad", validarEspecialidad, editarEspecialidad);

router.get("/", listarEspecialidades);
router.get("/:id_especialidad", obtenerEspecialidadPorId);

router.delete("/:id_especialidad", borrarEspecialidad);

export default router;