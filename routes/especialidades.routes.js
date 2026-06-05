import express from "express";
import {
    crearEspecialidad,
    listarEspecialidades,
    obtenerEspecialidadPorId,
    editarEspecialidad,
    borrarEspecialidad
} from "../controllers/especialidades.controller.js";

import { existeEspecialidad } from "../middlewares/existeEspecialidad.middleware.js";
import { validarId } from "../middlewares/validarId.middleware.js";
import { validarEspecialidad } from "../middlewares/validarEspecialidad.middleware.js";

const router = express.Router();


router.post("/", validarEspecialidad, crearEspecialidad);

router.put("/:id_especialidad", validarEspecialidad, editarEspecialidad);

router.get("/", listarEspecialidades);
router.get("/:id_especialidad", obtenerEspecialidadPorId);

router.delete("/:id_especialidad", borrarEspecialidad);

export default router;