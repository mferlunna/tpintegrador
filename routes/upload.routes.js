import express from "express";
import { upload } from "../src/middlewares/upload.middleware.js";
import { verificarToken } from "../src/middlewares/auth.middleware.js";
import { subirArchivo } from "../controlador/upload.controller.js";

const router = express.Router();

router.post(
  "/",
  verificarToken,
  upload.single("archivo"),
  subirArchivo
);

export default router;