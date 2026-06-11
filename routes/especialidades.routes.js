import express from "express";

import {
    crearEspecialidad,
    listarEspecialidades,
    obtenerEspecialidadPorId,
    editarEspecialidad,
    borrarEspecialidad
    } from "../controlador/especialidades.controller.js";

import { verificarToken } from "../src/middlewares/auth.middleware.js";
import { verificarRol } from "../src/middlewares/roles.middleware.js";
import { validarId } from "../src/middlewares/validarId.middleware.js";

const router = express.Router();

// Todos los usuarios logueados pueden listar
router.get("/", verificarToken, listarEspecialidades);

// Todos los usuarios logueados pueden consultar una especialidad
router.get("/:id_especialidad", verificarToken, validarId, obtenerEspecialidadPorId);

// Solo ADMIN (rol 3)
router.post("/", verificarToken, verificarRol([3]), crearEspecialidad);

router.put("/:id_especialidad", verificarToken, verificarRol([3]), validarId, editarEspecialidad);

router.delete("/:id_especialidad", verificarToken, verificarRol([3]), validarId, borrarEspecialidad);

export default router;