import { obtenerEstadisticasService } from "../src/servicios/estadisticas.service.js";

export const obtenerEstadisticas = async (req, res) => {

  try {

    const data =
      await obtenerEstadisticasService();

    res.json({
      estado: true,
      data
    });

  } catch {

    res.status(500).json({
      estado: false
    });

  }
};