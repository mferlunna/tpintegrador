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

router.get("/:id_especialidades", obtenerEspecialidadPorId);

router.put("/:id_especialidades", editarEspecialidad);

router.delete("/:id_especialidades", borrarEspecialidad);

export default router; 