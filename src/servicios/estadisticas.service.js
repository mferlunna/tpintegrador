import { obtenerEstadisticasRepository }
from "../repositorios/estadisticas.repository.js";

export const obtenerEstadisticasService = async () => {
  return await obtenerEstadisticasRepository();
};