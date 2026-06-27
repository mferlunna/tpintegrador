import PDFDocument from "pdfkit";
import { obtenerEstadisticasService } from "./estadisticas.service.js";

export const crearPDF = async () => {
    const estadisticas = await obtenerEstadisticasService();

    const doc = new PDFDocument({ size: "A4", margin: 40 });

    doc.fontSize(16).text("REPORTE DE ESTADÍSTICAS");

    estadisticas.forEach((item) => {
        doc
            .moveDown()
            .fontSize(12)
            .text(`Médico: ${item.medico}`)
            .text(`Especialidad: ${item.especialidad}`)
            .text(`Turnos: ${item.cantidad_turnos}`)
            .text(`Total: $${item.total_recaudado}`);
    });

    doc.end();

    return doc;
};