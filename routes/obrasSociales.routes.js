import express from "express";

import {
    crearObraSocial,
    listarObras,
    editarObra,
    eliminarObra,
    calcularCobertura
} from "../controlador/obrasSociales.controller.js";

const router = express.Router();

router.post("/", crearObraSocial);

router.get("/", listarObras);

router.put("/:id", editarObra);

router.delete("/:id", eliminarObra);

router.post("/calcular-cobertura", calcularCobertura);

export default router;