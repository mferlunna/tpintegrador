import PDFDocument from "pdfkit";
import { obtenerEstadisticasService } from "./estadisticas.service.js";

export const generarReportePDF = async (req, res) => {
  try {
    const estadisticas = await obtenerEstadisticasService();

    if (!estadisticas || estadisticas.length === 0) {
      return res.status(404).json({
        estado: false,
        mensaje: "No hay datos para generar el reporte."
      });
    }

    const doc = new PDFDocument({
      size: "A4",
      margin: 40
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=reporte-estadisticas-clinica.pdf"
    );

    doc.pipe(res);

   
    doc.rect(0, 0, 595, 80).fill("#1F4E79");

    doc
      .fillColor("white")
      .fontSize(20)
      .font("Helvetica-Bold")
      .text("SISTEMA MÉDICO INTEGRAL", 0, 30, {
        align: "center"
      });

    doc.fillColor("black");

    doc.moveDown(2);

    doc
      .fontSize(14)
      .fillColor("#1F4E79")
      .font("Helvetica-Bold")
      .text("REPORTE DE ESTADÍSTICAS Y ATENCIONES", {
        align: "center",
        underline: true
      });

    doc
      .moveDown(0.5)
      .fontSize(10)
      .fillColor("#444444")
      .text(`Fecha de emisión: ${new Date().toLocaleString()}`, {
        align: "center"
      });

    doc.moveDown(2);

    doc
      .fontSize(13)
      .fillColor("#1F4E79")
      .font("Helvetica-Bold")
      .text("Estadísticas de Turnos Atendidos", {
        align: "center"
      });

    doc.moveDown();

    estadisticas.forEach((item, index) => {

      const startY = doc.y;

      
      doc.rect(40, startY, 515, 130).fill("#F2F4F7");

      doc.fillColor("#1F4E79")
        .font("Helvetica-Bold")
        .fontSize(11)
        .text(`${index + 1}. Médico: ${item.medico}`, 50, startY + 10);

      doc
        .fillColor("#444444")
        .font("Helvetica")
        .fontSize(10)
        .text(`Especialidad: ${item.especialidad}`, 50, startY + 25);

      doc.fillColor("#222222")
        .font("Helvetica")
        .fontSize(10)
        .text(`Turnos atendidos: ${item.cantidad_turnos}`, 50, startY + 45)
        .text(`Pacientes distintos: ${item.cantidad_pacientes}`, 50, startY + 60)
        .text(`Obras sociales utilizadas: ${item.cantidad_obras_sociales}`, 50, startY + 75)
        .text(`Consultas particulares: ${item.particulares}`, 300, startY + 45)
        .text(`Consultas con obra social: ${item.con_obra_social}`, 300, startY + 60);

      doc
        .fillColor("#1F4E79")
        .font("Helvetica-Bold")
        .text(
          `Total recaudado: $${Number(item.total_recaudado).toFixed(2)}`,
          300,
          startY + 80
        );

      doc.y = startY + 145;
    });

    doc
      .fontSize(9)
      .fillColor("#666666")
      .text(
        "Facultad de Ciencias de la Administración - UNER - Programación III (2026)",
        40,
        780,
        { align: "center" }
      );

    doc.end();

  } catch (error) {
    console.error("Error al generar PDF:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        estado: false,
        mensaje: "Error al generar el reporte PDF"
      });
    }
  }
};