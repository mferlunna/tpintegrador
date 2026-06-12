const PDFDocument = require("pdfkit");
const db = require("../config/db");

const adminController = {
    generarReportePDF: async (req, res) => {
        try {
            const [resultadoSP] = await db.query("CALL SP_ObtenerEstadisticasAtenciones()");
            const estadisticas = resultadoSP[0]; // mysql2 devuelve un array anidado para los SP

            if (!estadisticas || estadisticas.length === 0) {
                return res.status(404).json({ message: "No hay datos de atenciones para generar el reporte." });
            }

            const doc = new PDFDocument({ size: "A4", margin: 40 });

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=reporte-estadisticas-clinica.pdf");

            doc.pipe(res);

            doc.fillColor("#1a365d")
               .fontSize(22)
               .text("SISTEMA MEDICO INTEGRAL", { align: "center" });
            
            doc.fillColor("#4a5568")
               .fontSize(12)
               .text("Reporte Gerencial de Estadísticas y Atenciones", { align: "center" });
            
            doc.moveDown(1);
            doc.strokeColor("#2b6cb0").lineWidth(2).moveTo(40, doc.y).lineTo(555, doc.y).stroke(); // Línea divisoria
            doc.moveDown(1.5);

            doc.fillColor("#2d3748")
               .fontSize(10)
               .text(`Fecha de Emisión: ${new Date().toLocaleString()}`)
               .text(`Generado por: Administrador del Sistema`)
               .text(`Estado de Auditoría: Registros Activos (Soft Delete verificado)`, { italic: true });
            
            doc.moveDown(2);


            doc.fillColor("#1a365d")
               .fontSize(14)
               .text("Rendimiento y Recaudación por Especialidad", { underline: true });
            
            doc.moveDown(1);


            estadisticas.forEach((item, index) => {
                doc.fillColor("#2d3748")
                   .fontSize(11)
                   .text(`${index + 1}. Especialidad: `, { continued: true, bold: true })
                   .fillColor("#2b6cb0")
                   .text(`${item.especialidad_nombre.toUpperCase()} `, { continued: true })
                   .fillColor("#2d3748")
                   .text(`| Atenciones: ${item.cantidad_turnos} | Total Recaudado: `, { continued: true })
                   .fillColor("#2f855a") // Verde para finanzas
                   .text(`$${parseFloat(item.total_recaudado).toFixed(2)}`);
                
                doc.moveDown(0.5); // Espaciado entre filas
            });

            doc.moveDown(3);

            doc.strokeColor("#e2e8f0").lineWidth(1).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
            doc.moveDown(1);
            doc.fillColor("#718096")
               .fontSize(9)
               .text("Facultad de Ciencias de la Administración - UNER - Programación III (2026)", { align: "center" });

            doc.end();

        } catch (error) {
            console.error("Error al generar el reporte PDF:", error);
            if (!res.headersSent) {
                return res.status(500).json({ message: "Error interno del servidor al procesar el archivo PDF." });
            }
        }
    }
};

module.exports = adminController;