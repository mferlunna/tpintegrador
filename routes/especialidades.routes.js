import { Router } from "express";

import {
    crearEspecialidad,
    listarEspecialidades,
    obtenerEspecialidadPorId,
    editarEspecialidad,
    borrarEspecialidad
} from "../controlador/especialidades.controller.js";

const router = Router();

router.post("/", crearEspecialidad);

router.get("/", listarEspecialidades);

router.get("/:id_especialidad", obtenerEspecialidadPorId);

router.put("/:id_especialidad", editarEspecialidad);

router.delete("/:id_especialidad", borrarEspecialidad);

export default router;