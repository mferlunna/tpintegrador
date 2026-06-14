import express from "express";
import { upload } from "../src/middlewares/upload.middleware.js";

const router = express.Router();

router.post(
  "/",
  upload.single("archivo"),
  (req, res) => {

    if (!req.file) {
      return res.status(400).json({
        estado: false,
        mensaje: "Debe seleccionar un archivo"
      });
    }

    res.json({
      estado: true,
      nombre: req.file.originalname,
      tamanio: req.file.size
    });

  }
);

export default router;