import { Router } from "express";
import {
    crearEspecialidad,
    listarEspecialidades,
    obtenerEspecialidadPorId
} from "../controlador/especialidades.controller.js";

const router = Router();

router.post("/", crearEspecialidad);

router.get("/", listarEspecialidades);

router.get("/:id_especialidades", obtenerEspecialidadPorId);

export default router;