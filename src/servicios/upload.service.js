import { actualizarFotoUsuario } from "../repositorios/upload.repository.js";

export const guardarRutaFotoService = async (idUsuario, rutaArchivo) => {
  return await actualizarFotoUsuario(idUsuario, rutaArchivo);
};