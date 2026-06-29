import { guardarRutaFotoService } from "../src/servicios/upload.service.js";

export const subirArchivo = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                estado: false,
                mensaje: "Debe seleccionar un archivo"
            });

        }

        const rutaArchivo = req.file.path || req.file.filename;

        await guardarRutaFotoService(
            req.usuario.id,
            rutaArchivo
        );

        return res.json({
            estado: true,
            mensaje: "Archivo subido correctamente",
            nombre: req.file.originalname,
            tamanio: req.file.size,
            ruta: rutaArchivo
        });

    } catch (error) {

        return res.status(500).json({
            estado: false,
            mensaje: "Error al subir archivo"
        });

    }

};