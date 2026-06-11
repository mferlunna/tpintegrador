import express from "express";

import {
    crearObra,
    listarObras,
    editarObra,
    eliminarObra,
    calcularCobertura
} from "../controlador/obrasSociales.controller.js";

import { validarId } from "../src/middlewares/validarId.middleware.js";
import { verificarToken } from "../src/middlewares/auth.middleware.js";
import { verificarRol } from "../src/middlewares/roles.middleware.js";

const router = express.Router();

router.post("/", verificarToken, verificarRol([3]), crearObra);

router.get("/", verificarToken, listarObras);

router.put("/:id", verificarToken, verificarRol([3]), validarId, editarObra);

router.delete("/:id", verificarToken, verificarRol([3]), validarId, eliminarObra);

router.post("/calcular-cobertura", verificarToken, calcularCobertura);

export default router;