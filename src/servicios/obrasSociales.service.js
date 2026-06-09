import {
    crearObraRepository,
    listarObrasRepository,
    obtenerObraPorIdRepository,
    editarObraRepository,
    eliminarObraRepository
} from "../repositorios/obrasSociales.repository.js";

export const crearObraService = async (data) => {
    return await crearObraRepository(data);
};

export const listarObrasService = async () => {
    return await listarObrasRepository();
};

export const obtenerObraPorIdService = async (id) => {
    const obra = await obtenerObraPorIdRepository(id);

    if (obra.length === 0) {
        throw new Error("No existe");
    }

    return obra[0];
};

export const editarObraService = async (id, data) => {
    return await editarObraRepository(id, data);
};

export const eliminarObraService = async (id) => {
    return await eliminarObraRepository(id);
};

export const calcularCoberturaService = (obra, valor_consulta) => {

    if (obra.es_particular == 1) {
        return {
            cobertura: 0,
            monto_cubierto: 0,
            monto_paciente: valor_consulta,
            mensaje: "Paciente particular"
        };
    }

    const monto_cubierto =
        (valor_consulta * obra.porcentaje_descuento) / 100;

    return {
        cobertura: obra.porcentaje_descuento,
        monto_cubierto,
        monto_paciente: valor_consulta - monto_cubierto
    };
};