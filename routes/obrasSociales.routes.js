import express from "express";

import {
    crearObra,
    listarObras,
    editarObra,
    eliminarObra,
    calcularCobertura
} from "../controlador/obrasSociales.controller.js";

import { validarId } from "../src/middlewares/validarId.middleware.js";

const router = express.Router();

router.post("/", crearObra);

router.get("/", listarObras);

router.put("/:id", validarId, editarObra);

router.delete("/:id", validarId, eliminarObra);

router.post("/calcular-cobertura", calcularCobertura);

export default router;