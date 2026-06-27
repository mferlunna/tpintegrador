import express from "express";
import { upload } from "../src/middlewares/upload.middleware.js";
import { verificarToken } from "../src/middlewares/auth.middleware.js";
import { pool } from "../src/db/conexion.js";

const router = express.Router();

router.post("/",
  verificarToken,
  upload.single("archivo"),
  async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({
          estado: false,
          mensaje: "Debe seleccionar un archivo"
        });
      }

const rutaArchivo = req.file.path || req.file.filename;

await pool.query(
  "UPDATE usuarios SET foto_path = ? WHERE id_usuario = ?",
  [rutaArchivo, req.usuario.id]
);

      return res.json({
        estado: true,
        mensaje: "Archivo subido correctamente",
        nombre: req.file.originalname,
        tamanio: req.file.size,
        ruta: rutaArchivo
      });

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        estado: false,
        mensaje: "Error al subir archivo"
      });
    }
  }
);

export default router;