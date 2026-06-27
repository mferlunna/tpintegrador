import { obtenerEstadisticasService } from "../src/servicios/estadisticas.service.js";
import { crearPDF } from "../src/servicios/pdf.service.js";

export const obtenerEstadisticas = async (req, res) => {
    try {
        const data = await obtenerEstadisticasService();
        res.json(data);
    } catch (error) {
        res.status(500).json({
            msg: "Error al obtener estadísticas"
        });
    }
};

export const generarReportePDF = async (req, res) => {
    try {
        const doc = await crearPDF();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=reporte.pdf"
        );

        doc.pipe(res);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al generar PDF"
        });
    }
};